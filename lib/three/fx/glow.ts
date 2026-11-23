import { AdditiveBlending, CanvasTexture, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import type { ColorRepresentation, Texture } from 'three'
import type { Disposer } from '../geometry'

/** Soft radial falloff: opaque white in the centre fading to fully transparent. */
export const createGlowTexture = (bin: Disposer) => {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext('2d')
  if (context) {
    const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)')
    gradient.addColorStop(0.62, 'rgba(255, 255, 255, 0.13)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)
  }

  return bin.track(new CanvasTexture(canvas))
}

export type BackdropOptions = {
  /** Size in the device's local units. */
  width: number
  height: number
  color: ColorRepresentation
  opacity: number
}

/**
 * Light and shadow for a floating device, as two camera-facing planes behind it:
 * an additive colored halo and a dark blob standing in for a contact shadow.
 * Because the canvas overlays the page, both tint the DOM content underneath.
 */
export const createBackdrop = (texture: Texture, options: BackdropOptions, bin: Disposer) => {
  const plane = bin.track(new PlaneGeometry(1, 1))

  const halo = new Mesh(
    plane,
    bin.track(
      new MeshBasicMaterial({
        map: texture,
        color: options.color,
        transparent: true,
        opacity: options.opacity,
        blending: AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      })
    )
  )
  halo.scale.set(options.width * 2.9, options.height * 1.55, 1)
  halo.position.z = -1
  halo.renderOrder = -2

  const shadow = new Mesh(
    plane,
    bin.track(
      new MeshBasicMaterial({
        map: texture,
        color: 0x000000,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        toneMapped: false
      })
    )
  )
  shadow.scale.set(options.width * 1.95, options.height * 1.22, 1)
  shadow.position.set(options.width * 0.08, -options.height * 0.07, -0.55)
  shadow.renderOrder = -1

  return [halo, shadow]
}
