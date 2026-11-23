import { CanvasTexture, MeshBasicMaterial, SRGBColorSpace } from 'three'
import { SCORE_TEAMS } from '../../scoreStore'
import type { ScoreSide, ScoreSnapshot } from '../../scoreStore'
import type { Disposer } from '../geometry'
import type { Stage } from '../stage'

/** `host` keeps score, `follower` is the read-only nearby view, `watch` is the wrist mirror. */
export type ScoreboardVariant = 'host' | 'follower' | 'watch'

export type ScoreboardOptions = {
  variant: ScoreboardVariant
  /** Camera cut-out drawn at the top of a phone layout. */
  cutout?: 'island' | 'punch-hole' | 'none'
  screen: { width: number; height: number; radius: number }
  initial: ScoreSnapshot
}

const SANS = 'Sora, "Helvetica Neue", Arial, sans-serif'
const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace'
const POP_SECONDS = 0.42

// DinkBoard's own palette, matching the app site.
const INK = {
  bezel: '#030405',
  top: '#0d190d',
  bottom: '#060d08',
  grid: 'rgba(139, 202, 30, 0.07)',
  text: '#f4ffec',
  muted: '#9fbd86',
  accent: '#ff7a2e',
  cell: '#0f180d',
  cellBorder: '#2d4622'
} as const

const SIDES: Record<ScoreSide, { color: string; soft: string; panel: string; border: string; label: string }> = {
  home: { color: '#8bca1e', soft: '#cce8b2', panel: '#17240f', border: 'rgba(139, 202, 30, 0.5)', label: 'HOME' },
  away: { color: '#6f8aff', soft: '#c2ccff', panel: '#0e1430', border: 'rgba(72, 105, 230, 0.65)', label: 'AWAY' }
}

const roundedPath = (c: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
  const r = Math.min(radius, width / 2, height / 2)
  c.beginPath()
  c.moveTo(x + r, y)
  c.arcTo(x + width, y, x + width, y + height, r)
  c.arcTo(x + width, y + height, x, y + height, r)
  c.arcTo(x, y + height, x, y, r)
  c.arcTo(x, y, x + width, y, r)
  c.closePath()
}

/**
 * A DinkBoard scoreboard painted onto a canvas texture. It redraws only when the score
 * changes (plus a short "pop" on the digit that moved), so an idle scoreboard costs nothing.
 */
export class ScoreboardScreen {
  readonly material: MeshBasicMaterial

  private readonly canvas: HTMLCanvasElement
  private readonly context: CanvasRenderingContext2D
  private readonly texture: CanvasTexture
  private readonly corner: number
  private readonly pop: Record<ScoreSide, number> = { home: 0, away: 0 }
  private snapshot: ScoreSnapshot
  private dirty = true

  constructor(
    private readonly stage: Stage,
    private readonly options: ScoreboardOptions,
    bin: Disposer
  ) {
    const { screen } = options
    this.snapshot = options.initial

    this.canvas = document.createElement('canvas')
    this.canvas.width = options.variant === 'watch' ? 360 : 540
    this.canvas.height = Math.round(this.canvas.width / (screen.width / screen.height))
    this.corner = (screen.radius / screen.width) * this.canvas.width

    const context = this.canvas.getContext('2d')
    if (!context) {
      throw new Error('2D canvas unavailable')
    }
    this.context = context

    this.texture = bin.track(new CanvasTexture(this.canvas))
    this.texture.colorSpace = SRGBColorSpace
    this.texture.anisotropy = stage.maxAnisotropy
    this.material = bin.track(new MeshBasicMaterial({ map: this.texture, toneMapped: false }))

    // The first paint may use a fallback face; repaint once the brand fonts are ready.
    const fonts = document.fonts
    if (fonts?.load) {
      void Promise.all([fonts.load(`700 120px ${SANS}`), fonts.load(`600 16px ${MONO}`)])
        .then(() => this.invalidate())
        .catch(() => {})
    }
  }

  set(snapshot: ScoreSnapshot) {
    if (snapshot.lastScored && snapshot.version !== this.snapshot.version) {
      this.pop[snapshot.lastScored] = 1
    }
    this.snapshot = snapshot
    this.invalidate()
  }

  /** Repaint if needed. Returns true while a pop animation is still running. */
  update(dt: number) {
    let popping = false
    for (const side of ['home', 'away'] as const) {
      if (this.pop[side] > 0) {
        this.pop[side] = Math.max(0, this.pop[side] - dt / POP_SECONDS)
        popping = true
      }
    }

    if (this.dirty || popping) {
      this.dirty = false
      if (this.options.variant === 'watch') {
        this.drawWatch()
      } else {
        this.drawPhone()
      }
      this.texture.needsUpdate = true
    }

    return popping
  }

  private invalidate() {
    this.dirty = true
    this.stage.invalidate()
  }

  private label(text: string, x: number, y: number, font: string, color: string, align: CanvasTextAlign = 'left', spacing = 0) {
    const c = this.context
    c.font = font
    c.fillStyle = color
    c.textAlign = align
    c.textBaseline = 'alphabetic'
    c.letterSpacing = `${spacing}px`
    c.fillText(text, x, y)
    c.letterSpacing = '0px'
  }

  private digit(side: ScoreSide, centerX: number, centerY: number, size: number) {
    const c = this.context
    // Ease-out pop: overshoot when the point lands, settle back to rest.
    const pop = this.pop[side]
    const scale = 1 + 0.22 * pop * pop

    c.save()
    c.translate(centerX, centerY)
    c.scale(scale, scale)
    c.font = `700 ${size}px ${SANS}`
    c.fillStyle = SIDES[side].color
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.shadowColor = SIDES[side].color
    c.shadowBlur = 26 * pop
    c.fillText(String(this.snapshot[side]), 0, size * 0.04)
    c.restore()
  }

  private beginScreen() {
    const c = this.context
    const { width, height } = this.canvas

    c.setTransform(1, 0, 0, 1, 0, 0)
    c.shadowBlur = 0
    c.fillStyle = INK.bezel
    c.fillRect(0, 0, width, height)

    c.save()
    roundedPath(c, 0, 0, width, height, this.corner)
    c.clip()
  }

  private drawPhone() {
    const c = this.context
    const { width: W, height: H } = this.canvas
    const s = this.snapshot
    const follower = this.options.variant === 'follower'
    const margin = 28

    this.beginScreen()

    const background = c.createLinearGradient(0, 0, 0, H)
    background.addColorStop(0, INK.top)
    background.addColorStop(1, INK.bottom)
    c.fillStyle = background
    c.fillRect(0, 0, W, H)

    // Court-line grid, as on the DinkBoard site.
    c.strokeStyle = INK.grid
    c.lineWidth = 1
    c.beginPath()
    for (let x = 42; x < W; x += 42) {
      c.moveTo(x + 0.5, 0)
      c.lineTo(x + 0.5, H)
    }
    for (let y = 42; y < H; y += 42) {
      c.moveTo(0, y + 0.5)
      c.lineTo(W, y + 0.5)
    }
    c.stroke()

    // Status bar.
    this.label('9:41', 48, 66, `600 25px ${SANS}`, INK.text)
    c.fillStyle = '#000000'
    if (this.options.cutout === 'island') {
      roundedPath(c, W / 2 - 76, 28, 152, 44, 22)
      c.fill()
    } else if (this.options.cutout === 'punch-hole') {
      c.beginPath()
      c.arc(W / 2, 52, 14, 0, Math.PI * 2)
      c.fill()
    }
    c.strokeStyle = 'rgba(244, 255, 236, 0.55)'
    c.lineWidth = 2
    roundedPath(c, W - 94, 46, 46, 22, 7)
    c.stroke()
    c.fillStyle = INK.text
    roundedPath(c, W - 90, 50, 30, 14, 4)
    c.fill()

    // Header.
    this.label(
      follower ? 'NEARBY · READ-ONLY' : 'LIVE SCORE',
      margin + 4,
      132,
      `600 16px ${MONO}`,
      follower ? INK.accent : INK.muted,
      'left',
      3
    )
    this.label(follower ? 'Following #321' : 'Host view', margin + 4, 176, `600 34px ${SANS}`, INK.text)

    const rally = `Rally ${s.rally}`
    c.font = `600 19px ${SANS}`
    const chipWidth = c.measureText(rally).width + 34
    c.fillStyle = '#101c0d'
    roundedPath(c, W - margin - chipWidth, 142, chipWidth, 42, 12)
    c.fill()
    c.strokeStyle = '#314a24'
    c.lineWidth = 1.5
    c.stroke()
    this.label(rally, W - margin - chipWidth / 2, 170, `600 19px ${SANS}`, '#d9efc6', 'center')

    // Score tiles.
    const footerHeight = 104
    const footerTop = H - 62 - footerHeight
    const tilesTop = 208
    const gap = 18
    const tileHeight = (footerTop - gap - tilesTop - gap) / 2

    const tile = (side: ScoreSide, top: number) => {
      const look = SIDES[side]
      const pop = this.pop[side]
      const serving = s.serving === side

      c.fillStyle = look.panel
      roundedPath(c, margin, top, W - margin * 2, tileHeight, 26)
      c.fill()
      c.strokeStyle = look.border
      c.lineWidth = 2 + pop * 3
      c.stroke()

      this.label(look.label, margin + 26, top + 46, `600 16px ${MONO}`, INK.muted, 'left', 3)
      this.label(SCORE_TEAMS[side], margin + 26, top + 82, `600 27px ${SANS}`, INK.text)
      this.digit(side, W / 2, top + tileHeight * 0.56, Math.min(210, tileHeight * 0.58))

      const caption = s.winner === side ? 'Game' : serving ? `Serving · ${s.server}` : 'Receiver'
      this.label(caption, W / 2, top + tileHeight - 30, `600 21px ${SANS}`, look.soft, 'center')
      if (serving && !s.winner) {
        c.font = `600 21px ${SANS}`
        const half = c.measureText(caption).width / 2
        c.fillStyle = look.color
        c.beginPath()
        c.arc(W / 2 - half - 16, top + tileHeight - 37, 6, 0, Math.PI * 2)
        c.fill()
      }
    }

    tile('home', tilesTop)
    tile('away', tilesTop + tileHeight + gap)

    // Footer cells.
    const cells: [string, string][] = follower
      ? [
          ['Server', String(s.server)],
          ['Mode', 'Read-only'],
          ['Host', '#321']
        ]
      : [
          ['Server', String(s.server)],
          ['Undo', s.canUndo ? 'Available' : 'None'],
          ['Nearby', '#321']
        ]
    const cellGap = 12
    const cellWidth = (W - margin * 2 - cellGap * 2) / 3
    cells.forEach(([title, value], index) => {
      const x = margin + index * (cellWidth + cellGap)
      c.fillStyle = INK.cell
      roundedPath(c, x, footerTop, cellWidth, footerHeight, 16)
      c.fill()
      c.strokeStyle = INK.cellBorder
      c.lineWidth = 1.5
      c.stroke()
      this.label(title, x + 16, footerTop + 38, `500 17px ${SANS}`, INK.muted)
      this.label(value, x + 16, footerTop + 76, `600 21px ${SANS}`, INK.text)
    })

    // Home indicator.
    c.fillStyle = 'rgba(244, 255, 236, 0.4)'
    roundedPath(c, W / 2 - 78, H - 26, 156, 7, 4)
    c.fill()

    c.restore()
  }

  private drawWatch() {
    const c = this.context
    const { width: W, height: H } = this.canvas
    const s = this.snapshot

    this.beginScreen()
    c.fillStyle = '#020403'
    c.fillRect(0, 0, W, H)

    this.label('DINKBOARD', W / 2, 54, `600 16px ${MONO}`, INK.muted, 'center', 3)

    const margin = 20
    const gap = 12
    const tileWidth = (W - margin * 2 - gap) / 2
    const top = 76
    const tileHeight = H - top - 96

    ;(['home', 'away'] as const).forEach((side, index) => {
      const look = SIDES[side]
      const x = margin + index * (tileWidth + gap)

      c.fillStyle = look.panel
      roundedPath(c, x, top, tileWidth, tileHeight, 26)
      c.fill()
      c.strokeStyle = look.border
      c.lineWidth = 2 + this.pop[side] * 3
      c.stroke()

      this.label(look.label, x + tileWidth / 2, top + 36, `600 14px ${MONO}`, look.soft, 'center', 2)
      this.digit(side, x + tileWidth / 2, top + tileHeight * 0.58, Math.min(128, tileHeight * 0.52))

      if (s.serving === side && !s.winner) {
        c.fillStyle = look.color
        c.beginPath()
        c.arc(x + tileWidth / 2, top + tileHeight - 20, 6, 0, Math.PI * 2)
        c.fill()
      }
    })

    const status = s.winner ? `Game · ${SCORE_TEAMS[s.winner]}` : `Rally ${s.rally}`
    this.label(status, W / 2, H - 46, `600 22px ${SANS}`, INK.text, 'center')

    c.restore()
  }
}
