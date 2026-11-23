import { Color, DataTexture, ShaderMaterial, SRGBColorSpace, Texture } from 'three'
import type { ColorRepresentation } from 'three'
import type { Disposer } from '../geometry'
import { easeInOutCubic, Spring } from '../math'
import type { Stage } from '../stage'

const TRANSITION_SECONDS = 0.62

const VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// Two screenshots with a shared-axis transition (outgoing slides away as the incoming slides in
// and fades up), cover-fitted and masked to the display's rounded corners. No tone mapping:
// a screen is a light source and should show its own colors.
const FRAGMENT = /* glsl */ `
uniform sampler2D uCurrent;
uniform sampler2D uNext;
uniform float uCurrentAspect;
uniform float uNextAspect;
uniform float uScreenAspect;
uniform float uRadius;
uniform float uProgress;
uniform float uDirection;
uniform float uPower;
uniform vec3 uBezel;

varying vec2 vUv;

vec3 sampleScreen(sampler2D image, vec2 uv, float aspect) {
  // Cover fit, anchored to the top of the image so status bars stay in view.
  float ratio = aspect / uScreenAspect;
  vec2 st = uv;
  if (ratio > 1.0) {
    st.x = (uv.x - 0.5) / ratio + 0.5;
  } else {
    st.y = 1.0 - (1.0 - uv.y) * ratio;
  }
  float inside = step(0.0, uv.x) * step(uv.x, 1.0);
  return texture2D(image, st).rgb * inside;
}

void main() {
  float shift = 0.16 * uDirection;
  vec3 current = sampleScreen(uCurrent, vUv + vec2(uProgress * shift, 0.0), uCurrentAspect);
  vec3 next = sampleScreen(uNext, vUv - vec2((1.0 - uProgress) * shift, 0.0), uNextAspect);
  vec3 color = mix(current, next, smoothstep(0.08, 0.92, uProgress)) * uPower;

  // Signed distance to the rounded display outline, in units of screen height.
  vec2 halfSize = vec2(uScreenAspect, 1.0) * 0.5;
  vec2 q = abs(vUv - 0.5) * vec2(uScreenAspect, 1.0) - halfSize + uRadius;
  float outline = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
  float edge = max(fwidth(outline), 1e-5);
  float mask = 1.0 - smoothstep(-edge, edge, outline);

  gl_FragColor = vec4(mix(uBezel, color, mask), 1.0);
  #include <colorspace_fragment>
}
`

/** Decode off the main thread before the texture exists, so showing it never hitches a frame. */
export const loadTexture = async (url: string, anisotropy: number) => {
  const image = new Image()
  image.decoding = 'async'
  image.src = url
  await image.decode()

  const texture = new Texture(image)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = anisotropy
  texture.needsUpdate = true
  return texture
}

export type ImageCyclerOptions = {
  urls: string[]
  /** Index shown first. */
  start?: number
  screen: { width: number; height: number; radius: number }
  bezel?: ColorRepresentation
}

/**
 * Display material that pages through a list of screenshots. Images load lazily:
 * the first one "powers on" the screen, the rest are fetched as they are needed.
 */
export class ImageCycler {
  readonly material: ShaderMaterial
  /** Index currently shown (the transition target once one starts). */
  index = 0

  private readonly textures: (Texture | null)[]
  private readonly pending = new Map<number, Promise<Texture | null>>()
  private readonly power = new Spring(0, 34, 1)
  private readonly placeholder: DataTexture
  private elapsed = -1
  private queued: number | null = null
  private disposed = false

  constructor(
    private readonly stage: Stage,
    private readonly options: ImageCyclerOptions,
    private readonly bin: Disposer
  ) {
    this.textures = options.urls.map(() => null)
    const count = options.urls.length
    this.index = count ? (((options.start ?? 0) % count) + count) % count : 0

    this.placeholder = bin.track(new DataTexture(new Uint8Array([8, 12, 18, 255]), 1, 1))
    this.placeholder.colorSpace = SRGBColorSpace
    this.placeholder.needsUpdate = true

    const { width, height, radius } = options.screen
    this.material = bin.track(
      new ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        toneMapped: false,
        uniforms: {
          uCurrent: { value: this.placeholder },
          uNext: { value: this.placeholder },
          uCurrentAspect: { value: width / height },
          uNextAspect: { value: width / height },
          uScreenAspect: { value: width / height },
          uRadius: { value: radius / height },
          uProgress: { value: 0 },
          uDirection: { value: 1 },
          uPower: { value: 0 },
          uBezel: { value: new Color(options.bezel ?? 0x030405) }
        }
      })
    )

    bin.track({ dispose: () => (this.disposed = true) })

    void this.load(this.index).then((texture) => {
      if (!texture) {
        return
      }
      this.material.uniforms.uCurrent!.value = texture
      this.material.uniforms.uCurrentAspect!.value = aspectOf(texture)
      this.power.target = 1
      this.stage.invalidate()
      void this.load(this.index + 1)
    })
  }

  get count() {
    return this.options.urls.length
  }

  /** Slide to a screenshot. Requests made mid-transition collapse to the latest one. */
  show(index: number) {
    const count = this.count
    if (count === 0) {
      return
    }
    const target = ((index % count) + count) % count
    if (target === this.index && this.queued === null) {
      return
    }
    this.queued = target
    void this.load(target).then(() => this.begin())
  }

  /** Advance animations. Returns true while something on the screen is still changing. */
  update(dt: number) {
    let animating = false
    const uniforms = this.material.uniforms

    if (!this.power.settled) {
      uniforms.uPower!.value = this.power.step(dt)
      animating = true
    }

    if (this.elapsed >= 0) {
      this.elapsed += dt
      const progress = Math.min(this.elapsed / TRANSITION_SECONDS, 1)
      uniforms.uProgress!.value = easeInOutCubic(progress)
      animating = true

      if (progress >= 1) {
        uniforms.uCurrent!.value = uniforms.uNext!.value
        uniforms.uCurrentAspect!.value = uniforms.uNextAspect!.value
        uniforms.uProgress!.value = 0
        this.elapsed = -1
        void this.load(this.index + 1)
        this.begin()
      }
    }

    return animating
  }

  private begin() {
    if (this.disposed || this.elapsed >= 0 || this.queued === null) {
      return
    }
    const target = this.queued
    const texture = this.textures[target]
    if (!texture) {
      return
    }

    this.queued = null
    if (target === this.index) {
      return
    }

    const count = this.count
    // Take the shorter way round, so wrapping from the last screen to the first still moves forward.
    const forward = (target - this.index + count) % count
    const uniforms = this.material.uniforms
    uniforms.uDirection!.value = forward <= count / 2 ? 1 : -1
    uniforms.uNext!.value = texture
    uniforms.uNextAspect!.value = aspectOf(texture)
    uniforms.uProgress!.value = 0
    this.index = target
    this.elapsed = 0
    this.stage.invalidate()
  }

  private load(index: number) {
    const count = this.count
    if (count === 0) {
      return Promise.resolve(null)
    }
    const slot = ((index % count) + count) % count
    let request = this.pending.get(slot)
    if (!request) {
      request = loadTexture(this.options.urls[slot]!, this.stage.maxAnisotropy)
        .then((texture) => {
          if (this.disposed) {
            texture.dispose()
            return null
          }
          this.textures[slot] = this.bin.track(texture)
          // Upload now rather than on the frame it first appears.
          this.stage.renderer.initTexture(texture)
          return texture
        })
        .catch(() => null)
      this.pending.set(slot, request)
    }
    return request
  }
}

const aspectOf = (texture: Texture) => {
  const image = texture.image as { width?: number; height?: number } | undefined
  return image?.width && image.height ? image.width / image.height : 0.45
}
