export const TAU = Math.PI * 2

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t

export const invLerp = (from: number, to: number, value: number) =>
  from === to ? 0 : clamp((value - from) / (to - from), 0, 1)

export const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1)
  return x * x * (3 - 2 * x)
}

export const easeInOutCubic = (t: number) => {
  const x = clamp(t, 0, 1)
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2
}

/** Frame-rate independent exponential smoothing toward a target. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt))

const SUB_STEP = 1 / 120

/**
 * Damped spring. `ratio` is the damping ratio: 1 settles without overshoot,
 * lower values bounce. Integrated in fixed sub-steps so it behaves the same
 * at 60 and 120 Hz and stays stable after a dropped frame.
 */
export class Spring {
  value: number
  target: number
  velocity = 0

  constructor(
    value = 0,
    public stiffness = 170,
    public ratio = 1
  ) {
    this.value = value
    this.target = value
  }

  step(dt: number) {
    const damping = 2 * this.ratio * Math.sqrt(this.stiffness)
    let remaining = dt
    while (remaining > 1e-6) {
      const h = Math.min(remaining, SUB_STEP)
      const acceleration = -this.stiffness * (this.value - this.target) - damping * this.velocity
      this.velocity += acceleration * h
      this.value += this.velocity * h
      remaining -= h
    }
    return this.value
  }

  snap(value = this.target) {
    this.value = value
    this.target = value
    this.velocity = 0
  }

  get settled() {
    return Math.abs(this.value - this.target) < 1e-3 && Math.abs(this.velocity) < 1e-3
  }
}

/** Deterministic 0..1 pseudo-random from an integer seed (stable layouts across reloads). */
export const seeded = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
