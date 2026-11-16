import { ExtrudeGeometry, Shape, ShapeGeometry } from 'three'
import type { BufferGeometry, Material, Texture } from 'three'
import { toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js'

/** Rounded rectangle outline centred on the origin, wound counter-clockwise (faces +z). */
export const roundedRectShape = (width: number, height: number, radius: number) => {
  const w = width / 2
  const h = height / 2
  const r = Math.min(radius, w, h)
  const shape = new Shape()

  shape.moveTo(-w + r, -h)
  shape.lineTo(w - r, -h)
  shape.absarc(w - r, -h + r, r, -Math.PI / 2, 0, false)
  shape.lineTo(w, h - r)
  shape.absarc(w - r, h - r, r, 0, Math.PI / 2, false)
  shape.lineTo(-w + r, h)
  shape.absarc(-w + r, h - r, r, Math.PI / 2, Math.PI, false)
  shape.lineTo(-w, -h + r)
  shape.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, false)

  return shape
}

/** Flat rounded rectangle whose UVs run 0..1 across its bounds (ShapeGeometry emits raw coordinates). */
export const roundedPlaneGeometry = (width: number, height: number, radius: number, curveSegments = 16) => {
  const geometry = new ShapeGeometry(roundedRectShape(width, height, radius), curveSegments)
  const position = geometry.attributes.position!
  const uv = geometry.attributes.uv!

  for (let index = 0; index < position.count; index += 1) {
    uv.setXY(index, position.getX(index) / width + 0.5, position.getY(index) / height + 0.5)
  }
  uv.needsUpdate = true

  return geometry
}

export type SlabOptions = {
  width: number
  height: number
  depth: number
  /** Corner radius of the outline. */
  radius: number
  /** Edge rounding between the faces and the side wall. */
  bevel: number
  bevelSegments?: number
  curveSegments?: number
}

/**
 * Rounded slab centred on the origin, `width` x `height` x `depth` overall.
 * Material group 0 is the front/back faces, group 1 the side wall and bevel.
 */
export const roundedSlabGeometry = ({
  width,
  height,
  depth,
  radius,
  bevel,
  bevelSegments = 5,
  curveSegments = 20
}: SlabOptions): BufferGeometry => {
  const inner = depth - bevel * 2
  const shape = roundedRectShape(width - bevel * 2, height - bevel * 2, Math.max(radius - bevel, 0.001))
  const geometry = new ExtrudeGeometry(shape, {
    depth: inner,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments,
    curveSegments,
    steps: 1
  })

  geometry.translate(0, 0, -inner / 2)
  // ExtrudeGeometry is faceted; smooth across the curved corners and bevel but keep true edges crisp.
  return toCreasedNormals(geometry, Math.PI / 4.5)
}

/** Collects GPU resources so a scene can release everything it created in one call. */
export class Disposer {
  private readonly items = new Set<{ dispose(): void }>()

  track<T extends BufferGeometry | Material | Texture | { dispose(): void }>(item: T): T {
    this.items.add(item)
    return item
  }

  dispose() {
    for (const item of this.items) {
      item.dispose()
    }
    this.items.clear()
  }
}
