import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Points, ShaderMaterial } from 'three'
import type { ColorRepresentation } from 'three'
import type { Disposer } from '../geometry'
import { clamp, damp, seeded } from '../math'
import type { Frame, Stage, StageActor } from '../stage'

const VERTEX = /* glsl */ `
attribute float aSeed;
attribute float aSize;

uniform float uTime;
uniform float uPointScale;

varying float vSeed;
varying float vTwinkle;

void main() {
  vSeed = aSeed;

  // Slow drift, entirely on the GPU: no per-frame buffer uploads.
  vec3 p = position;
  float phase = aSeed * 6.2831;
  p.x += sin(uTime * 0.11 + phase) * 0.05;
  p.y += cos(uTime * 0.14 + phase * 1.7) * 0.06 + fract(uTime * 0.012 + aSeed) * 0.16 - 0.08;
  p.z += sin(uTime * 0.09 + phase * 0.6) * 0.1;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  // Nearer motes are larger, which sells the depth.
  gl_PointSize = aSize * uPointScale * (14.0 / -mv.z);
  vTwinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed) + phase * 3.0);
}
`

const FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;

varying float vSeed;
varying float vTwinkle;

void main() {
  float falloff = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
  vec3 color = mix(uColorA, uColorB, step(0.5, fract(vSeed * 7.31)));
  gl_FragColor = vec4(color, falloff * falloff * uOpacity * vTwinkle);
  #include <colorspace_fragment>
}
`

export type ParticleFieldOptions = {
  /** Slot whose area the motes fill and follow. */
  slot: string
  colors: [ColorRepresentation, ColorRepresentation]
  count?: number
  opacity?: number
}

/** A depth field of drifting motes around a slot: ambient light in the page's accent colors. */
export class ParticleField implements StageActor {
  private readonly points: Points
  private readonly material: ShaderMaterial
  private fade = 0

  constructor(
    private readonly stage: Stage,
    private readonly options: ParticleFieldOptions,
    bin: Disposer
  ) {
    const count = options.count ?? 150
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const sizes = new Float32Array(count)

    for (let index = 0; index < count; index += 1) {
      // Unit box; scaled onto the slot every frame.
      positions[index * 3] = seeded(index * 3 + 1) - 0.5
      positions[index * 3 + 1] = seeded(index * 3 + 2) - 0.5
      positions[index * 3 + 2] = seeded(index * 3 + 3) - 0.5
      seeds[index] = seeded(index + 97)
      sizes[index] = 2 + seeded(index + 211) ** 3 * 9
    }

    const geometry = bin.track(new BufferGeometry())
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('aSeed', new Float32BufferAttribute(seeds, 1))
    geometry.setAttribute('aSize', new Float32BufferAttribute(sizes, 1))

    this.material = bin.track(
      new ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        toneMapped: false,
        uniforms: {
          uTime: { value: 0 },
          uPointScale: { value: 1 },
          uOpacity: { value: 0 },
          uColorA: { value: new Color(options.colors[0]) },
          uColorB: { value: new Color(options.colors[1]) }
        }
      })
    )

    this.points = new Points(geometry, this.material)
    // The box is rescaled each frame, so a cached bounding sphere would cull it wrongly.
    this.points.frustumCulled = false
    this.points.visible = false
    this.points.renderOrder = -3
    stage.scene.add(this.points)
  }

  update(frame: Frame) {
    const rect = this.stage.slotRect(this.options.slot)
    const { viewport, world } = frame
    const onScreen = !!rect && rect.top < viewport.height && rect.top + rect.height > 0

    if (!rect || (!onScreen && this.fade < 0.01)) {
      this.points.visible = false
      this.fade = 0
      return false
    }

    // Fade with how much of the slot is still in view.
    const visibleHeight = Math.min(rect.top + rect.height, viewport.height) - Math.max(rect.top, 0)
    const target = onScreen ? clamp(visibleHeight / (rect.height * 0.6), 0, 1) : 0
    this.fade = frame.reducedMotion ? target : damp(this.fade, target, 3.5, frame.dt)

    const uniforms = this.material.uniforms
    uniforms.uOpacity!.value = this.fade * (this.options.opacity ?? 0.85)
    uniforms.uPointScale!.value = this.stage.renderer.getPixelRatio() * (viewport.height / 900)
    if (!frame.reducedMotion) {
      uniforms.uTime!.value = frame.time
    }

    this.points.position.set(
      (rect.left + rect.width / 2 - viewport.width / 2) * world.perPx,
      -(rect.top + rect.height / 2 - viewport.height / 2) * world.perPx,
      -1.2
    )
    this.points.scale.set(rect.width * world.perPx * 1.5, rect.height * world.perPx * 1.25, 5)
    this.points.visible = this.fade > 0.01

    return this.points.visible && !frame.reducedMotion
  }
}
