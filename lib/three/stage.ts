import {
  DirectionalLight,
  NeutralToneMapping,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer
} from 'three'
import type { ColorRepresentation, WebGLRenderTarget } from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { clamp, damp } from './math'

/** A DOM slot's box in CSS pixels, relative to the stage canvas. */
export type SlotRect = { left: number; top: number; width: number; height: number }

/** Everything an actor needs to advance one frame. One instance, mutated in place. */
export type Frame = {
  /** Seconds of stage time (stops while asleep or hidden). */
  time: number
  dt: number
  viewport: { width: number; height: number }
  /** Visible world size on the z = 0 plane, and world units per CSS pixel there. */
  world: { width: number; height: number; perPx: number }
  scrollY: number
  maxScroll: number
  /** Smoothed pointer position, -1..1 across the viewport. */
  pointer: { x: number; y: number }
  /** >= 1024px: the scroll story's extra stations are active. */
  wide: boolean
  reducedMotion: boolean
  /** 1 at full quality, lower after the adaptive tier steps down. */
  quality: number
}

export interface StageActor {
  /** Advance one frame. Return true while the actor still needs frames (on screen or moving). */
  update(frame: Frame): boolean
}

export type PointerPhase = 'start' | 'move' | 'end' | 'tap'
export type PointerData = { dx: number; dy: number; vx: number }

/** What a scene module hands back to the Vue layer. */
export type SceneHandle = {
  actors: StageActor[]
  /** Slot ids the scene drives at the given breakpoint; their static fallbacks get hidden. */
  slots(wide: boolean): string[]
  pointer(slot: string, phase: PointerPhase, data: PointerData): void
  command(name: string, ...args: unknown[]): void
  dispose(): void
}

export type SceneEmit = (event: string, ...args: unknown[]) => void

export type SceneContext = {
  emit: SceneEmit
  score: import('../scoreStore').ScoreStore
}

export type SceneFactory = (stage: Stage, context: SceneContext) => SceneHandle | Promise<SceneHandle>

export type StageOptions = {
  canvas: HTMLCanvasElement
  reducedMotion: boolean
  resolveSlot: (id: string) => HTMLElement | null
  onContextLost?: () => void
  onWideChange?: (wide: boolean) => void
}

// A narrow field of view keeps devices undistorted when they dock near the edges of the viewport.
const FOV = 28
const CAMERA_Z = 14
const WIDE_QUERY = '(min-width: 1024px)'
// The canvas covers the viewport, so cap the buffer rather than trust devicePixelRatio alone.
const MAX_PIXELS = 5.2e6
const MIN_QUALITY = 0.6
const WARMUP_FRAMES = 45
const SAMPLE_FRAMES = 50
const SLOW_FRAME_SECONDS = 1 / 42

/**
 * One WebGL canvas per page. The stage owns the renderer, camera, lighting and frame
 * loop, and maps DOM slot rectangles onto the z = 0 plane so actors can dock into them.
 *
 * The loop is demand-driven: it runs while any actor reports it is on screen or still
 * moving, then goes to sleep until scroll, pointer or resize wakes it.
 */
export class Stage {
  readonly renderer: WebGLRenderer
  readonly scene = new Scene()
  readonly camera: PerspectiveCamera
  readonly maxAnisotropy: number
  wide: boolean
  reducedMotion: boolean

  private readonly canvas: HTMLCanvasElement
  private readonly options: StageOptions
  private readonly actors: StageActor[] = []
  private readonly slotCache = new Map<string, SlotRect | null>()
  private readonly environment: WebGLRenderTarget
  private readonly wideQuery: MediaQueryList
  private readonly resizeObserver: ResizeObserver
  private readonly pointerTarget = { x: 0, y: 0 }
  private readonly frame: Frame = {
    time: 0,
    dt: 1 / 60,
    viewport: { width: 1, height: 1 },
    world: { width: 1, height: 1, perPx: 1 },
    scrollY: 0,
    maxScroll: 1,
    pointer: { x: 0, y: 0 },
    wide: false,
    reducedMotion: false,
    quality: 1
  }

  private raf = 0
  private last = 0
  private started = false
  private paused = false
  private asleep = true
  private disposed = false
  private dirty = true
  private wasActive = false
  private canvasLeft = 0
  private canvasTop = 0
  private quality = 1
  private activeFrames = 0
  private sampleCount = 0
  private sampleTotal = 0
  private slowWindows = 0
  private onFirstFrame: (() => void) | null = null

  constructor(options: StageOptions) {
    this.options = options
    this.canvas = options.canvas
    this.reducedMotion = options.reducedMotion

    // Throws when WebGL2 is unavailable; the caller treats that as "keep the static fallbacks".
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.toneMapping = NeutralToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.maxAnisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy())

    this.camera = new PerspectiveCamera(FOV, 1, 2, 40)
    this.camera.position.set(0, 0, CAMERA_Z)

    // Studio reflections for the metal and glass, generated on the GPU (no HDR download).
    const pmrem = new PMREMGenerator(this.renderer)
    const room = new RoomEnvironment()
    this.environment = pmrem.fromScene(room, 0.035)
    this.scene.environment = this.environment.texture
    this.scene.environmentIntensity = 0.92
    room.dispose()
    pmrem.dispose()

    const key = new DirectionalLight(0xffffff, 1.5)
    key.position.set(-3.5, 6, 9)
    this.scene.add(key)

    this.wideQuery = window.matchMedia(WIDE_QUERY)
    this.wide = this.wideQuery.matches
    this.wideQuery.addEventListener('change', this.handleWideChange)

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.canvas)

    window.addEventListener('scroll', this.invalidate, { passive: true })
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true })
    document.addEventListener('visibilitychange', this.handleVisibility)
    this.canvas.addEventListener('webglcontextlost', this.handleContextLost)

    this.resize()
  }

  /** Brand-colored edge lights from behind, so the frames pick up the page's accent colors. */
  addRimLights(left: ColorRepresentation, right: ColorRepresentation, intensity = 3.2) {
    const leftLight = new DirectionalLight(left, intensity)
    leftLight.position.set(-9, 2.5, -4)
    const rightLight = new DirectionalLight(right, intensity)
    rightLight.position.set(9, -1.5, -4)
    this.scene.add(leftLight, rightLight)
  }

  addActor(actor: StageActor) {
    this.actors.push(actor)
    this.invalidate()
  }

  /** Begin rendering. `onFirstFrame` fires once something has actually been drawn. */
  start(onFirstFrame?: () => void) {
    this.onFirstFrame = onFirstFrame ?? null
    this.started = true
    this.invalidate()
  }

  /** Slot rectangle for this frame, or null when the slot is missing or not laid out. */
  slotRect(id: string): SlotRect | null {
    const cached = this.slotCache.get(id)
    if (cached !== undefined) {
      return cached
    }

    const element = this.options.resolveSlot(id)
    let rect: SlotRect | null = null
    if (element) {
      const box = element.getBoundingClientRect()
      if (box.width > 1 && box.height > 1) {
        rect = {
          left: box.left - this.canvasLeft,
          top: box.top - this.canvasTop,
          width: box.width,
          height: box.height
        }
      }
    }

    this.slotCache.set(id, rect)
    return rect
  }

  setReducedMotion(value: boolean) {
    this.reducedMotion = value
    this.invalidate()
  }

  /** Wake the loop and force at least one render. Safe to call from any event. */
  invalidate = () => {
    this.dirty = true
    this.request()
  }

  dispose() {
    if (this.disposed) {
      return
    }
    this.disposed = true
    cancelAnimationFrame(this.raf)

    this.wideQuery.removeEventListener('change', this.handleWideChange)
    this.resizeObserver.disconnect()
    window.removeEventListener('scroll', this.invalidate)
    window.removeEventListener('pointermove', this.handlePointerMove)
    document.removeEventListener('visibilitychange', this.handleVisibility)
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost)

    this.actors.length = 0
    this.environment.dispose()
    this.renderer.dispose()
    // Release the context now: route changes would otherwise pile up live contexts until GC.
    this.renderer.forceContextLoss()
  }

  private request() {
    if (this.raf || !this.started || this.paused || this.disposed) {
      return
    }
    this.raf = requestAnimationFrame(this.tick)
  }

  private tick = (now: number) => {
    this.raf = 0
    if (this.disposed || this.paused) {
      return
    }

    const frame = this.frame
    // Coming out of sleep the real elapsed time is meaningless; resume with one nominal frame.
    const elapsed = this.asleep ? 1 / 60 : (now - this.last) / 1000
    this.last = now
    this.asleep = false

    frame.dt = clamp(elapsed, 0, 1 / 20)
    frame.time += frame.dt
    frame.scrollY = window.scrollY
    frame.maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    frame.pointer.x = damp(frame.pointer.x, this.pointerTarget.x, 6, frame.dt)
    frame.pointer.y = damp(frame.pointer.y, this.pointerTarget.y, 6, frame.dt)
    frame.wide = this.wide
    frame.reducedMotion = this.reducedMotion
    frame.quality = this.quality
    this.slotCache.clear()

    let active = false
    for (const actor of this.actors) {
      active = actor.update(frame) || active
    }

    // One extra frame after the last actor leaves, so the canvas is cleared rather than left stale.
    if (active || this.dirty || this.wasActive) {
      this.renderer.render(this.scene, this.camera)
      this.dirty = false

      if (this.onFirstFrame) {
        const callback = this.onFirstFrame
        this.onFirstFrame = null
        callback()
      }
      if (active) {
        this.sample(elapsed)
      }
    }

    this.wasActive = active
    if (active) {
      this.request()
    } else {
      this.asleep = true
    }
  }

  /** Adaptive quality: two slow sample windows in a row step the resolution down once. */
  private sample(elapsed: number) {
    this.activeFrames += 1
    if (this.activeFrames < WARMUP_FRAMES || this.quality <= MIN_QUALITY) {
      return
    }

    this.sampleCount += 1
    this.sampleTotal += elapsed
    if (this.sampleCount < SAMPLE_FRAMES) {
      return
    }

    const average = this.sampleTotal / this.sampleCount
    this.sampleCount = 0
    this.sampleTotal = 0
    this.slowWindows = average > SLOW_FRAME_SECONDS ? this.slowWindows + 1 : 0

    if (this.slowWindows >= 2) {
      this.slowWindows = 0
      this.quality = Math.max(MIN_QUALITY, this.quality - 0.2)
      this.resize()
    }
  }

  private resize() {
    if (this.disposed) {
      return
    }

    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    if (!width || !height) {
      return
    }

    const box = this.canvas.getBoundingClientRect()
    this.canvasLeft = box.left
    this.canvasTop = box.top

    const deviceRatio = Math.min(window.devicePixelRatio || 1, 2)
    const budgetRatio = Math.sqrt(MAX_PIXELS / (width * height))
    const ratio = Math.max(0.75, Math.min(deviceRatio, budgetRatio) * this.quality)

    this.renderer.setPixelRatio(ratio)
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    const worldHeight = 2 * CAMERA_Z * Math.tan((FOV * Math.PI) / 360)
    this.frame.viewport.width = width
    this.frame.viewport.height = height
    this.frame.world.height = worldHeight
    this.frame.world.width = worldHeight * (width / height)
    this.frame.world.perPx = worldHeight / height

    this.invalidate()
  }

  private handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') {
      return
    }
    const { width, height } = this.frame.viewport
    this.pointerTarget.x = clamp((event.clientX / width) * 2 - 1, -1, 1)
    this.pointerTarget.y = clamp((event.clientY / height) * 2 - 1, -1, 1)
    this.request()
  }

  private handleVisibility = () => {
    this.paused = document.hidden
    if (this.paused) {
      cancelAnimationFrame(this.raf)
      this.raf = 0
      return
    }
    this.asleep = true
    this.invalidate()
  }

  private handleWideChange = (event: MediaQueryListEvent) => {
    this.wide = event.matches
    this.options.onWideChange?.(this.wide)
    this.invalidate()
  }

  private handleContextLost = (event: Event) => {
    event.preventDefault()
    this.options.onContextLost?.()
  }
}
