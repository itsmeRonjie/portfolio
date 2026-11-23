import { CanvasTexture, Group, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, PlaneGeometry, SRGBColorSpace } from 'three'
import type { ColorRepresentation, Texture } from 'three'
import { roundedPlaneGeometry, roundedSlabGeometry } from '../geometry'
import type { Disposer } from '../geometry'

/** Edge length of a tile in local units. */
export const TILE_SIZE = 1

const ICON_PIXELS = 256

/** Rasterise an icon (SVG or bitmap) into a texture, contain-fitted with padding. */
export const loadIconTexture = async (url: string, anisotropy: number, bin: Disposer): Promise<Texture | null> => {
  try {
    const image = new Image()
    image.decoding = 'async'
    image.src = url
    await image.decode()

    const canvas = document.createElement('canvas')
    canvas.width = ICON_PIXELS
    canvas.height = ICON_PIXELS
    const context = canvas.getContext('2d')
    if (!context) {
      return null
    }

    const scale = Math.min(ICON_PIXELS / image.naturalWidth, ICON_PIXELS / image.naturalHeight)
    const width = image.naturalWidth * scale
    const height = image.naturalHeight * scale
    context.drawImage(image, (ICON_PIXELS - width) / 2, (ICON_PIXELS - height) / 2, width, height)

    const texture = bin.track(new CanvasTexture(canvas))
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = anisotropy
    return texture
  } catch {
    return null
  }
}

/**
 * A home-screen-style app tile: a thick glass squircle with a metal rim and an icon.
 * Shared geometry and materials are passed in so a set of tiles costs one of each.
 */
export const createTileKit = (rim: ColorRepresentation, bin: Disposer) => {
  const depth = 0.17
  const bevel = 0.04
  const body = bin.track(roundedSlabGeometry({ width: TILE_SIZE, height: TILE_SIZE, depth, radius: 0.27, bevel }))
  const face = bin.track(roundedPlaneGeometry(TILE_SIZE - bevel * 2, TILE_SIZE - bevel * 2, 0.23, 16))
  const iconPlane = bin.track(new PlaneGeometry(0.6, 0.6))

  const glass = bin.track(
    new MeshPhysicalMaterial({ color: 0x0b131f, metalness: 0.1, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08 })
  )
  const edge = bin.track(
    new MeshPhysicalMaterial({ color: rim, metalness: 1, roughness: 0.3, clearcoat: 0.3, envMapIntensity: 1.3 })
  )

  return (icon: Texture | null) => {
    const tile = new Group()
    tile.add(new Mesh(body, [glass, edge]))

    const front = new Mesh(face, glass)
    front.position.z = depth / 2 + 0.004
    tile.add(front)

    const back = new Mesh(face, glass)
    back.rotation.y = Math.PI
    back.position.z = -depth / 2 - 0.004
    tile.add(back)

    if (icon) {
      const mark = new Mesh(
        iconPlane,
        bin.track(new MeshBasicMaterial({ map: icon, transparent: true, depthWrite: false, toneMapped: false }))
      )
      mark.position.z = depth / 2 + 0.008
      mark.renderOrder = 1
      tile.add(mark)
    }

    return tile
  }
}
