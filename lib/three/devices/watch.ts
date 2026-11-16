import {
  AdditiveBlending,
  CylinderGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry
} from 'three'
import type { ColorRepresentation, Material } from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { roundedPlaneGeometry, roundedSlabGeometry } from '../geometry'
import type { Disposer } from '../geometry'

export type WatchPalette = {
  case: ColorRepresentation
  band: ColorRepresentation
}

/** Case and display size in world units. The case is 1 unit tall; the band extends beyond it. */
export const watchSpec = {
  width: 0.86,
  height: 1,
  depth: 0.24,
  radius: 0.25,
  bevel: 0.05,
  screen: { width: 0.72, height: 0.87, radius: 0.19 }
} as const

const LAYER = 0.004

/** A small square-faced smartwatch: bevelled case, display, crown, side button and two band stubs. */
export const createWatch = (
  options: { palette: WatchPalette; screenMaterial: Material },
  bin: Disposer
) => {
  const { width, height, depth, radius, bevel, screen } = watchSpec
  const watch = new Group()
  const front = depth / 2

  const metal = bin.track(
    new MeshPhysicalMaterial({
      color: options.palette.case,
      metalness: 1,
      roughness: 0.24,
      clearcoat: 0.4,
      clearcoatRoughness: 0.4,
      envMapIntensity: 1.3
    })
  )
  const blackGlass = bin.track(
    new MeshPhysicalMaterial({ color: 0x030405, metalness: 0, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 })
  )
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
  const band = bin.track(
    new MeshPhysicalMaterial({ color: options.palette.band, metalness: 0, roughness: 0.78, sheen: 0.6, sheenRoughness: 0.5 })
  )

  const body = new Mesh(bin.track(roundedSlabGeometry({ width, height, depth, radius, bevel })), [blackGlass, metal])
  watch.add(body)

  const face = bin.track(roundedPlaneGeometry(width - bevel * 2, height - bevel * 2, Math.max(radius - bevel, 0.01), 20))
  const glass = new Mesh(face, blackGlass)
  glass.position.z = front + LAYER
  watch.add(glass)

  const display = new Mesh(bin.track(new PlaneGeometry(screen.width, screen.height)), options.screenMaterial)
  display.position.z = front + LAYER * 2
  watch.add(display)

  const sheen = new Mesh(face, reflection)
  sheen.position.z = front + LAYER * 3
  sheen.renderOrder = 2
  watch.add(sheen)

  // Crown and side button on the right edge.
  const crown = new Mesh(bin.track(new CylinderGeometry(0.075, 0.075, 0.06, 28)), metal)
  crown.rotation.z = Math.PI / 2
  crown.position.set(width / 2 + 0.022, 0.2, 0)
  watch.add(crown)

  const button = new Mesh(bin.track(new RoundedBoxGeometry(0.03, 0.2, depth * 0.34, 3, 0.012)), metal)
  button.position.set(width / 2 + 0.004, -0.14, 0)
  watch.add(button)

  // Band stubs, angled back so the watch reads as wrapped around a wrist.
  const bandGeometry = bin.track(new RoundedBoxGeometry(width * 0.8, 0.62, depth * 0.42, 4, 0.045))
  for (const side of [-1, 1] as const) {
    const strap = new Mesh(bandGeometry, band)
    strap.position.set(0, side * (height / 2 + 0.24), -0.1)
    strap.rotation.x = side * 0.42
    watch.add(strap)
  }

  return watch
}
