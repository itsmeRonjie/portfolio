import { Group } from 'three'
import type { Object3D } from 'three'
import { clamp, damp, lerp, smoothstep, Spring, TAU } from './math'
import type { Frame, PointerData, PointerPhase, Stage, StageActor } from './stage'

export type Pose = {
  yaw?: number
  pitch?: number
  roll?: number
  /** Multiplier on the slot-fitted size. */
  scale?: number
  /** Offsets as a fraction of the slot height (x, y) and in world units (z, toward the camera). */
  x?: number
  y?: number
  z?: number
}

export type Station = {
  /** Id of the DOM slot this station docks into. */
  slot: string
  /** Dock into a sub-area of the slot instead: centre as fractions of the slot, height as a fraction of its height. */
  region?: { x: number; y: number; height: number }
  pose?: Pose
  /** Part of the scroll story: only exists at >= 1024px. */
  wideOnly?: boolean
  /** Scale in as the slot nears the middle of the viewport instead of always being present. */
  appear?: boolean
}

export type DockedActorOptions = {
  /** The device. It receives the rotation; position and scale go on a parent. */
  object: Object3D
  /** Camera-facing extras (halo, shadow) that follow the device without rotating. */
  backdrop?: Object3D[]
  /** Local size of the part that should fill a slot. */
  size: { width: number; height: number }
  stations: Station[]
  float?: { amplitude?: number; speed?: number; phase?: number }
  /** Pointer parallax, radians at the edge of the viewport. */
  parallax?: number
  /** Extra yaw (radians) and lift (world units) at the midpoint of a flight between stations. */
  spin?: number
  lift?: number
  /** Seconds to wait before the entrance animation. */
  introDelay?: number
}

type Target = {
  slot: string
  x: number
  y: number
  z: number
  scale: number
  yaw: number
  pitch: number
  roll: number
  /** Scroll position at which this station sits in the middle of the viewport. */
  focus: number
  presence: number
}

const DRAG_YAW_PER_PX = 0.011
const DRAG_PITCH_PER_PX = 0.006
const DRAG_RETURN_SECONDS = 1.6

/**
 * A device that docks into DOM slots and travels between them as the page scrolls.
 *
 * Position tracks the slot rigidly (so a docked device stays glued to its card); the
 * blend between stations is scroll-scrubbed and damped, and rotation, scale, drag and
 * pointer tilt all run on springs. That split is what makes it read as a floating
 * object rather than something lagging behind the DOM.
 */
export class DockedActor implements StageActor {
  readonly root = new Group()
  private readonly pivot = new Group()
  private readonly targets: Target[] = []
  private readonly yaw = new Spring(0, 110, 1)
  private readonly pitch = new Spring(0, 110, 1)
  private readonly roll = new Spring(0, 110, 1)
  private readonly presence = new Spring(0, 140, 0.8)
  private readonly intro = new Spring(0, 55, 0.78)
  private readonly userYaw = new Spring(0, 80, 0.72)
  private readonly userPitch = new Spring(0, 120, 0.9)

  private progress = 0
  private primed = false
  private dragging = false
  private releasedAt = -Infinity
  private age = 0
  private time = 0
  private station = ''

  constructor(
    private readonly stage: Stage,
    private readonly options: DockedActorOptions
  ) {
    this.pivot.rotation.order = 'YXZ'
    this.pivot.add(options.object)
    this.root.add(this.pivot)
    for (const item of options.backdrop ?? []) {
      this.root.add(item)
    }
    this.root.visible = false
    stage.scene.add(this.root)
  }

  /** Slot the device is currently docked to (or nearest to, mid-flight). */
  get currentSlot() {
    return this.station
  }

  slots(wide: boolean) {
    return this.options.stations.filter((station) => wide || !station.wideOnly).map((station) => station.slot)
  }

  pointer(phase: PointerPhase, data: PointerData) {
    if (phase === 'start') {
      this.dragging = true
    } else if (phase === 'move') {
      this.userYaw.target += data.dx * DRAG_YAW_PER_PX
      this.userPitch.target = clamp(this.userPitch.target + data.dy * DRAG_PITCH_PER_PX, -0.45, 0.45)
    } else if (phase === 'end') {
      this.dragging = false
      this.releasedAt = this.time
      // Carry the release velocity so a flick keeps spinning.
      this.userYaw.target += clamp(data.vx * 0.0009, -2.4, 2.4)
    }
    this.stage.invalidate()
  }

  update(frame: Frame): boolean {
    const targets = this.resolve(frame)
    if (targets.length === 0) {
      this.root.visible = false
      this.station = ''
      return false
    }

    const { dt, time, reducedMotion } = frame
    this.time = time
    const goal = this.goal(targets, frame)

    if (!this.primed) {
      this.primed = true
      this.progress = goal
      if (reducedMotion) {
        this.intro.snap(1)
      }
    }

    // Scroll-scrubbed, then damped: flights ease out instead of stopping dead with the wheel.
    this.progress = reducedMotion ? Math.round(goal) : damp(this.progress, goal, 9, dt)

    const last = targets.length - 1
    const index = clamp(Math.floor(this.progress), 0, Math.max(last - 1, 0))
    const from = targets[index]!
    const to = targets[Math.min(index + 1, last)]!
    const t = clamp(this.progress - index, 0, 1)
    const flight = Math.sin(Math.PI * t)
    this.station = (t < 0.5 ? from : to).slot

    // Entrance: wait for the delay, then rise and turn into place.
    this.age += dt
    if (this.age >= (this.options.introDelay ?? 0)) {
      this.intro.target = 1
    }
    const intro = reducedMotion ? 1 : clamp(this.intro.step(dt), 0, 1.2)
    const entering = 1 - Math.min(intro, 1)

    // After a drag, let the device spin on for a moment, then turn it back to face front.
    if (!this.dragging && time - this.releasedAt > DRAG_RETURN_SECONDS) {
      this.userYaw.target = Math.round(this.userYaw.target / TAU) * TAU
      this.userPitch.target = 0
    }
    this.userYaw.step(dt)
    this.userPitch.step(dt)

    const float = this.options.float ?? {}
    const speed = float.speed ?? 0.9
    const phase = float.phase ?? 0
    const alive = reducedMotion ? 0 : 1
    const bob = Math.sin(time * speed + phase)
    const sway = Math.sin(time * speed * 0.46 + phase * 1.7)
    const parallax = reducedMotion ? 0 : (this.options.parallax ?? 0.1)
    const direction = Math.sign(to.x - from.x) || 1

    this.yaw.target =
      lerp(from.yaw, to.yaw, t) + flight * (this.options.spin ?? 0) * direction + frame.pointer.x * parallax
    this.pitch.target = lerp(from.pitch, to.pitch, t) + frame.pointer.y * parallax * 0.6
    this.roll.target = lerp(from.roll, to.roll, t)
    this.presence.target = lerp(from.presence, to.presence, t)

    if (reducedMotion) {
      this.yaw.snap()
      this.pitch.snap()
      this.roll.snap()
      this.presence.snap()
    } else {
      this.yaw.step(dt)
      this.pitch.step(dt)
      this.roll.step(dt)
      this.presence.step(dt)
    }

    const presence = clamp(this.presence.value, 0, 1.15)
    const baseScale = lerp(from.scale, to.scale, t)
    const scale = baseScale * presence * lerp(0.8, 1, Math.min(intro, 1.1))
    const x = lerp(from.x, to.x, t)
    const y =
      lerp(from.y, to.y, t) +
      bob * (float.amplitude ?? 0.05) * baseScale * alive -
      entering * 1.3 * baseScale
    const z = lerp(from.z, to.z, t) + flight * (this.options.lift ?? 0)

    this.root.position.set(x, y, z)
    this.root.scale.setScalar(Math.max(scale, 1e-4))
    this.pivot.rotation.set(
      this.pitch.value + this.userPitch.value,
      this.yaw.value + this.userYaw.value + sway * 0.045 * alive - entering * 1.1,
      this.roll.value + sway * 0.012 * alive
    )

    // Cull against the viewport, with room for the halo around the device.
    const { size } = this.options
    const radius = Math.hypot(size.width, size.height) * 0.5 * scale * 1.7
    const visible =
      scale > 0.002 &&
      Math.abs(x) - radius < frame.world.width / 2 &&
      Math.abs(y) - radius < frame.world.height / 2
    this.root.visible = visible

    const travelling = Math.abs(this.progress - goal) > 1e-3
    if (!visible) {
      // Off screen: only keep the loop alive while a flight is still bringing it in.
      return travelling
    }
    if (!reducedMotion) {
      return true
    }
    return travelling || !this.userYaw.settled || !this.userPitch.settled
  }

  /** Where the device should be along its stations (0 = first, 1 = second...), from the scroll position. */
  private goal(targets: Target[], frame: Frame) {
    if (targets.length < 2) {
      return 0
    }

    let index = 0
    while (index < targets.length - 2 && frame.scrollY >= targets[index + 1]!.focus) {
      index += 1
    }

    const from = targets[index]!
    const to = targets[index + 1]!
    const viewport = frame.viewport.height
    const gap = Math.max(to.focus - from.focus, 1)
    // Stay docked near each station, then travel. Long gaps travel only on the approach, so the
    // device leaves with its section and swoops in for the next one instead of drifting between.
    const hold = Math.min(0.2 * viewport, 0.28 * gap)
    const travel = Math.min(gap - hold * 2, 0.85 * viewport)
    const end = to.focus - hold
    const start = end - travel

    return index + smoothstep((frame.scrollY - start) / Math.max(end - start, 1))
  }

  /** Station targets in world space for the slots that exist right now, in page order. */
  private resolve(frame: Frame) {
    const { viewport, world } = frame
    const { size } = this.options
    const targets = this.targets
    let count = 0

    for (const station of this.options.stations) {
      if (station.wideOnly && !frame.wide) {
        continue
      }
      const rect = this.stage.slotRect(station.slot)
      if (!rect) {
        continue
      }

      let centerX = rect.left + rect.width / 2
      let centerY = rect.top + rect.height / 2
      let height = rect.height
      let width = rect.width
      if (station.region) {
        centerX = rect.left + station.region.x * rect.width
        centerY = rect.top + station.region.y * rect.height
        height = station.region.height * rect.height
        width = Number.POSITIVE_INFINITY
      }

      const pose = station.pose ?? {}
      // Contain-fit the device inside the slot.
      const fit = Math.min(height / size.height, width / size.width) * world.perPx
      const scale = fit * (pose.scale ?? 1)
      const offset = height * world.perPx
      const distance = Math.abs(centerY - viewport.height / 2) / viewport.height

      const target = (targets[count] ??= {
        slot: '',
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        yaw: 0,
        pitch: 0,
        roll: 0,
        focus: 0,
        presence: 1
      })
      target.slot = station.slot
      target.x = (centerX - viewport.width / 2) * world.perPx + (pose.x ?? 0) * offset
      target.y = -(centerY - viewport.height / 2) * world.perPx + (pose.y ?? 0) * offset
      target.z = pose.z ?? 0
      target.scale = scale
      target.yaw = pose.yaw ?? 0
      target.pitch = pose.pitch ?? 0
      target.roll = pose.roll ?? 0
      target.focus = clamp(frame.scrollY + centerY - viewport.height / 2, 0, frame.maxScroll)
      target.presence = station.appear ? 1 - smoothstep((distance - 0.3) / 0.28) : 1

      // A station far off screen parks the device just outside the viewport, so flights stay short.
      const wing = world.height / 2 + size.height * scale * 0.75
      target.y = clamp(target.y, -wing, wing)

      count += 1
    }

    targets.length = count
    targets.sort((a, b) => a.focus - b.focus)
    return targets
  }
}

/** Runs a callback every frame; handy for screens and effects that animate alongside actors. */
export class Ticker implements StageActor {
  constructor(private readonly callback: (frame: Frame) => boolean | void) {}

  update(frame: Frame) {
    return this.callback(frame) === true
  }
}
