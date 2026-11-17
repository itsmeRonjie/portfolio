import { Group } from 'three'
import type { ColorRepresentation, Material, Mesh, MeshBasicMaterial, Texture } from 'three'
import { DockedActor, Ticker } from '../actors'
import type { DockedActorOptions, Station } from '../actors'
import { createPhone, phoneSpec } from '../devices/phone'
import type { PhonePalette, PhoneVariant } from '../devices/phone'
import { createWatch, watchSpec } from '../devices/watch'
import type { WatchPalette } from '../devices/watch'
import { createBackdrop, createGlowTexture } from '../fx/glow'
import { createTileKit, loadIconTexture, TILE_SIZE } from '../fx/tiles'
import { Disposer } from '../geometry'
import type { Frame, Stage, StageActor } from '../stage'

export type DeviceActor = {
  actor: DockedActor
  /** Halo material, for sync pulses. */
  halo: MeshBasicMaterial
  baseGlow: number
}

type ActorTuning = Pick<DockedActorOptions, 'float' | 'parallax' | 'spin' | 'lift' | 'swing' | 'introDelay'>

export class SceneKit {
  readonly bin = new Disposer()
  readonly actors: StageActor[] = []
  private glow: Texture | null = null
  private readonly timers = new Set<number>()

  constructor(readonly stage: Stage) {}

  private glowTexture() {
    this.glow ??= createGlowTexture(this.bin)
    return this.glow
  }

  private dock(
    object: Group,
    size: { width: number; height: number },
    glow: { color: ColorRepresentation; opacity: number },
    stations: Station[],
    tuning: ActorTuning
  ): DeviceActor {
    const [halo, shadow] = createBackdrop(
      this.glowTexture(),
      { width: size.width, height: size.height, color: glow.color, opacity: glow.opacity },
      this.bin
    )
    const actor = new DockedActor(this.stage, {
      object,
      backdrop: [halo!, shadow!],
      size,
      stations,
      ...tuning
    })
    this.actors.push(actor)
    return { actor, halo: (halo as Mesh).material as MeshBasicMaterial, baseGlow: glow.opacity }
  }

  phone(
    variant: PhoneVariant,
    palette: PhonePalette,
    screenMaterial: Material,
    stations: Station[],
    tuning: ActorTuning & { glow?: number } = {}
  ) {
    const spec = phoneSpec(variant)
    const object = new Group()
    object.add(createPhone(spec, { palette, screenMaterial, monogram: 'RDM' }, this.bin))
    return this.dock(
      object,
      { width: spec.width, height: spec.height },
      { color: palette.accent, opacity: tuning.glow ?? 0.32 },
      stations,
      tuning
    )
  }

  watch(
    palette: WatchPalette,
    glowColor: ColorRepresentation,
    screenMaterial: Material,
    stations: Station[],
    tuning: ActorTuning = {}
  ) {
    const object = new Group()
    object.add(createWatch({ palette, screenMaterial }, this.bin))
    // Fit by the case plus band so the strap never overflows the slot.
    return this.dock(object, { width: watchSpec.width, height: 2.1 }, { color: glowColor, opacity: 0.26 }, stations, tuning)
  }

  /** App-icon tiles orbiting inside a slot. Icons load in the background. */
  tiles(
    slot: string,
    rim: ColorRepresentation,
    items: { icon: string; x: number; y: number; z: number; size: number; yaw: number; delay: number }[]
  ) {
    const make = createTileKit(rim, this.bin)
    items.forEach((item, index) => {
      const holder = new Group()
      const actor = new DockedActor(this.stage, {
        object: holder,
        size: { width: TILE_SIZE, height: TILE_SIZE },
        stations: [
          {
            slot,
            region: { x: item.x, y: item.y, height: item.size },
            pose: { yaw: item.yaw, pitch: 0.18, z: item.z },
            appear: true,
            // Narrow layouts have no room around the phones for them.
            wideOnly: true
          }
        ],
        float: { amplitude: 0.18, speed: 0.7 + index * 0.13, phase: index * 1.9 },
        parallax: 0.32,
        swing: item.yaw > 0 ? 1.4 : -1.4,
        introDelay: item.delay
      })
      this.actors.push(actor)
      void loadIconTexture(item.icon, this.stage.maxAnisotropy, this.bin).then((texture) => {
        holder.add(make(texture))
        this.stage.invalidate()
      })
    })
  }

  tick(callback: (frame: Frame) => boolean | void) {
    this.actors.push(new Ticker(callback))
  }

  /** setTimeout that is cancelled when the scene is disposed. */
  later(ms: number, run: () => void) {
    const id = window.setTimeout(() => {
      this.timers.delete(id)
      run()
    }, ms)
    this.timers.add(id)
  }

  dispose() {
    for (const id of this.timers) {
      window.clearTimeout(id)
    }
    this.timers.clear()
    this.bin.dispose()
  }
}

/** Decaying glow burst on a device halo, used to show data "arriving" over sync. */
export const createPulse = (device: DeviceActor) => {
  let level = 0
  let delay = 0
  return {
    fire(after = 0) {
      delay = after
      level = 1
    },
    update(dt: number) {
      if (level <= 0) {
        return false
      }
      if (delay > 0) {
        delay -= dt
        return true
      }
      level = Math.max(0, level - dt * 1.8)
      device.halo.opacity = device.baseGlow * (1 + level * 2.2)
      return level > 0
    }
  }
}

export const pointerToDevice = (devices: Record<string, DeviceActor>, slot: string) =>
  Object.values(devices).find((device) => device.actor.currentSlot === slot)
