import {
  AdditiveBlending,
  CanvasTexture,
  CircleGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RingGeometry,
  SRGBColorSpace
} from 'three'
import type { ColorRepresentation, Material } from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { roundedPlaneGeometry, roundedSlabGeometry } from '../geometry'
import type { Disposer } from '../geometry'

export type PhoneVariant = 'android' | 'ios'

export type PhonePalette = {
  /** Metal band around the edge. */
  frame: ColorRepresentation
  /** Satin glass on the back. */
  back: ColorRepresentation
  /** Monogram tint. */
  accent: ColorRepresentation
}

export type PhoneSpec = {
  variant: PhoneVariant
  /** Body size in world units; every phone is 3 units tall. */
  width: number
  height: number
  depth: number
  radius: number
  bevel: number
  screen: { width: number; height: number; radius: number }
}

/**
 * Proportions for the two silhouettes. The screens are sized to their content:
 * 9:20 Android screenshots, and a 393x852pt iPhone layout.
 */
export const phoneSpec = (variant: PhoneVariant): PhoneSpec =>
  variant === 'ios'
    ? {
        variant,
        width: 1.423,
        height: 3,
        depth: 0.168,
        radius: 0.215,
        bevel: 0.024,
        screen: { width: 1.351, height: 2.928, radius: 0.184 }
      }
    : {
        variant,
        width: 1.397,
        height: 3,
        depth: 0.178,
        radius: 0.2,
        bevel: 0.046,
        screen: { width: 1.307, height: 2.91, radius: 0.158 }
      }

export type PhoneOptions = {
  palette: PhonePalette
  /** Material for the display; it owns its own content and corner masking. */
  screenMaterial: Material
  /** Initials engraved on the back, or null for none. */
  monogram?: string | null
}

// Layer spacing on the faces. Generous enough to stay clean on a 16-bit depth buffer.
const LAYER = 0.004
const GLASS_COLOR = 0x030405

const monogramTexture = (text: string, color: string) => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 224
  const context = canvas.getContext('2d')
  if (context) {
    context.fillStyle = color
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = '700 150px Sora, "Helvetica Neue", Arial, sans-serif'
    context.fillText(text, canvas.width / 2, canvas.height / 2 + 6)
  }
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

/**
 * Builds a phone procedurally: a bevelled metal band, glass front and back, a camera
 * module, side buttons and a monogram. Facing +z, centred on the origin.
 */
export const createPhone = (spec: PhoneSpec, options: PhoneOptions, bin: Disposer) => {
  const { width, height, depth, radius, bevel, variant } = spec
  const { palette } = options
  const phone = new Group()
  const front = depth / 2

  const frame = bin.track(
    new MeshPhysicalMaterial({
      color: palette.frame,
      metalness: 1,
      roughness: 0.27,
      clearcoat: 0.3,
      clearcoatRoughness: 0.45,
      envMapIntensity: 1.3
    })
  )
  const backGlass = bin.track(
    new MeshPhysicalMaterial({
      color: palette.back,
      metalness: 0.15,
      roughness: 0.48,
      clearcoat: 0.7,
      clearcoatRoughness: 0.35
    })
  )
  const blackGlass = bin.track(
    new MeshPhysicalMaterial({
      color: GLASS_COLOR,
      metalness: 0,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.05
    })
  )
  // A black dielectric drawn additively leaves only its specular term: the room reflected in the glass.
  const reflection = bin.track(
    new MeshStandardMaterial({
      color: 0x000000,
      metalness: 0,
      roughness: 0.06,
      envMapIntensity: 1.5,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    })
  )
  const lensGlass = bin.track(
    new MeshPhysicalMaterial({
      color: 0x05070b,
      metalness: 0.3,
      roughness: 0.04,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 1.8
    })
  )
  const iris = bin.track(new MeshBasicMaterial({ color: 0x0d1a2e }))
  const flash = bin.track(new MeshBasicMaterial({ color: 0xf5ecd0 }))

  // ---- Body: the band is the slab's side wall; both faces get covered by flat plates. ----
  const body = new Mesh(bin.track(roundedSlabGeometry({ width, height, depth, radius, bevel })), [blackGlass, frame])
  phone.add(body)

  const faceWidth = width - bevel * 2
  const faceHeight = height - bevel * 2
  const face = bin.track(roundedPlaneGeometry(faceWidth, faceHeight, Math.max(radius - bevel, 0.01), 20))

  // ---- Front: glass, display, then the reflection sweeping over both. ----
  const glass = new Mesh(face, blackGlass)
  glass.position.z = front + LAYER
  phone.add(glass)

  const screen = new Mesh(bin.track(new PlaneGeometry(spec.screen.width, spec.screen.height)), options.screenMaterial)
  screen.position.z = front + LAYER * 2
  phone.add(screen)

  const sheen = new Mesh(face, reflection)
  sheen.position.z = front + LAYER * 3
  sheen.renderOrder = 2
  phone.add(sheen)

  // ---- Back: built in a group turned around, so +x is the viewer's right when looking at it. ----
  const back = new Group()
  back.rotation.y = Math.PI
  back.position.z = -front
  phone.add(back)

  const backPlate = new Mesh(face, backGlass)
  backPlate.position.z = LAYER
  back.add(backPlate)

  const addLens = (x: number, y: number, size: number, base: number) => {
    const ring = new Mesh(bin.track(new CylinderGeometry(size, size, 0.03, 40)), frame)
    ring.rotation.x = Math.PI / 2
    ring.position.set(x, y, base + 0.015)
    const disc = new Mesh(bin.track(new CircleGeometry(size * 0.8, 40)), lensGlass)
    disc.position.set(x, y, base + 0.031)
    const pupil = new Mesh(bin.track(new RingGeometry(size * 0.2, size * 0.42, 32)), iris)
    pupil.position.set(x, y, base + 0.033)
    back.add(ring, disc, pupil)
  }

  const addDot = (x: number, y: number, size: number, base: number, material: Material) => {
    const dot = new Mesh(bin.track(new CircleGeometry(size, 24)), material)
    dot.position.set(x, y, base)
    back.add(dot)
  }

  if (variant === 'ios') {
    // Square plateau in the top-left corner with a three-lens cluster.
    const plateauSize = 0.66
    const plateauDepth = 0.05
    const centerX = -(faceWidth / 2 - 0.41)
    const centerY = faceHeight / 2 - 0.41
    const plateau = new Mesh(
      bin.track(
        roundedSlabGeometry({ width: plateauSize, height: plateauSize, depth: plateauDepth, radius: 0.18, bevel: 0.016 })
      ),
      [backGlass, backGlass]
    )
    plateau.position.set(centerX, centerY, plateauDepth / 2)
    back.add(plateau)

    const top = plateauDepth + LAYER
    addLens(centerX - 0.15, centerY + 0.15, 0.118, top)
    addLens(centerX - 0.15, centerY - 0.15, 0.118, top)
    addLens(centerX + 0.16, centerY, 0.118, top)
    addDot(centerX + 0.17, centerY + 0.22, 0.036, top + 0.002, flash)
    addDot(centerX + 0.17, centerY - 0.22, 0.03, top + 0.002, iris)
  } else {
    // Floating pill "visor" across the upper back.
    const visorWidth = 1.04
    const visorHeight = 0.3
    const visorDepth = 0.058
    const centerY = faceHeight / 2 - 0.44
    const visor = new Mesh(
      bin.track(
        roundedSlabGeometry({ width: visorWidth, height: visorHeight, depth: visorDepth, radius: 0.15, bevel: 0.02 })
      ),
      [blackGlass, frame]
    )
    visor.position.set(0, centerY, visorDepth / 2)
    back.add(visor)

    const inlay = new Mesh(bin.track(roundedPlaneGeometry(visorWidth - 0.07, visorHeight - 0.07, 0.115, 16)), blackGlass)
    inlay.position.set(0, centerY, visorDepth + LAYER)
    back.add(inlay)

    const top = visorDepth + LAYER * 2
    addLens(-0.27, centerY, 0.082, top)
    addLens(-0.03, centerY, 0.082, top)
    addDot(0.3, centerY, 0.034, top + 0.002, flash)
  }

  // ---- Side buttons ----
  const addButton = (side: -1 | 1, y: number, length: number) => {
    const button = new Mesh(bin.track(new RoundedBoxGeometry(0.024, length, depth * 0.36, 3, 0.009)), frame)
    button.position.set(side * (width / 2 + 0.003), y, 0)
    phone.add(button)
  }

  if (variant === 'ios') {
    addButton(-1, 0.8, 0.11)
    addButton(-1, 0.53, 0.2)
    addButton(-1, 0.27, 0.2)
    addButton(1, 0.44, 0.34)
  } else {
    addButton(1, 0.62, 0.17)
    addButton(1, 0.22, 0.4)
  }

  // ---- Monogram ----
  if (options.monogram) {
    const texture = bin.track(monogramTexture(options.monogram, '#ffffff'))
    const mark = new Mesh(
      bin.track(new PlaneGeometry(0.46, 0.2)),
      bin.track(
        new MeshBasicMaterial({
          map: texture,
          color: palette.accent,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
          toneMapped: false
        })
      )
    )
    mark.position.set(0, -0.12, LAYER * 2)
    back.add(mark)
  }

  return phone
}
