import { phoneSpec } from '../devices/phone'
import { watchSpec } from '../devices/watch'
import { ParticleField } from '../fx/particles'
import { ScoreboardScreen } from '../screens/scoreboard'
import type { SceneFactory } from '../stage'
import { createPulse, pointerToDevice, SceneKit } from './shared'

const AUTOPLAY_SECONDS = 3
const IDLE_AFTER_INPUT_SECONDS = 9

/**
 * DinkBoard app site: the iPhone host keeps score, and an Apple Watch mirror and a nearby
 * follower phone light up a beat later as each point "syncs" to them.
 */
export const createDinkBoardScene: SceneFactory = (stage, { score }) => {
  const kit = new SceneKit(stage)
  stage.addRimLights(0x8bca1e, 0xff7a2e, 2.8)

  const ios = phoneSpec('ios')
  const android = phoneSpec('android')

  const host = new ScoreboardScreen(stage, { variant: 'host', cutout: 'island', screen: ios.screen, initial: score.get() }, kit.bin)
  const follower = new ScoreboardScreen(
    stage,
    { variant: 'follower', cutout: 'punch-hole', screen: android.screen, initial: score.get() },
    kit.bin
  )
  const wrist = new ScoreboardScreen(stage, { variant: 'watch', screen: watchSpec.screen, initial: score.get() }, kit.bin)

  kit.actors.push(new ParticleField(stage, { slot: 'db.stage', colors: [0x8bca1e, 0xff7a2e], count: 110 }, kit.bin))

  const devices = {
    follower: kit.phone(
      'android',
      { frame: 0x3a4232, back: 0x16210f, accent: 0x6f8aff },
      follower.material,
      [{ slot: 'db.follower', pose: { yaw: -0.5, pitch: 0.06, roll: -0.04, z: -1 } }],
      { float: { amplitude: 0.05, speed: 0.85, phase: 2.4 }, introDelay: 0.4, glow: 0.22 }
    ),
    host: kit.phone(
      'ios',
      { frame: 0x9aa392, back: 0x1a2614, accent: 0x8bca1e },
      host.material,
      [{ slot: 'db.host', pose: { yaw: 0.26, pitch: 0.05, roll: 0.02 } }],
      { float: { amplitude: 0.045, speed: 0.95 }, introDelay: 0.12, glow: 0.3 }
    ),
    watch: kit.watch(
      { case: 0x8f969e, band: 0xff7a2e },
      0xff7a2e,
      wrist.material,
      [{ slot: 'db.watch', pose: { yaw: -0.35, pitch: 0.12, z: 0.8 } }],
      { float: { amplitude: 0.07, speed: 1.15, phase: 1.1 }, introDelay: 0.55, parallax: 0.16 }
    )
  }

  const followerPulse = createPulse(devices.follower)
  const watchPulse = createPulse(devices.watch)
  const unsubscribe = score.subscribe((snapshot) => {
    host.set(snapshot)
    kit.later(140, () => wrist.set(snapshot))
    kit.later(320, () => follower.set(snapshot))
    watchPulse.fire(0.14)
    followerPulse.fire(0.32)
  })

  let clock = 0
  let now = 0
  let lastInput = -Infinity

  kit.tick((frame) => {
    now = frame.time
    let busy = host.update(frame.dt)
    busy = follower.update(frame.dt) || busy
    busy = wrist.update(frame.dt) || busy
    busy = followerPulse.update(frame.dt) || busy
    busy = watchPulse.update(frame.dt) || busy

    if (!frame.reducedMotion && devices.host.actor.onScreen && now - lastInput > IDLE_AFTER_INPUT_SECONDS) {
      clock += frame.dt
      if (clock > AUTOPLAY_SECONDS) {
        clock = 0
        const { serving } = score.get()
        // Serving side wins a little more often, like real rallies.
        score.score(Math.random() < 0.56 ? serving : serving === 'home' ? 'away' : 'home')
      }
    }
    return busy
  })

  for (const actor of kit.actors) {
    stage.addActor(actor)
  }

  return {
    actors: kit.actors,
    slots: (wide) => [...new Set(Object.values(devices).flatMap((device) => device.actor.slots(wide)))],
    pointer(slot, phase, data) {
      lastInput = now
      const device = pointerToDevice(devices, slot)
      if (!device) {
        return
      }
      if (phase === 'tap') {
        score.score(device === devices.follower ? 'away' : 'home')
        return
      }
      device.actor.pointer(phase, data)
    },
    command(name) {
      // DOM score buttons pause autoplay so the visitor stays in control.
      if (name === 'input') {
        lastInput = now
        clock = 0
      }
    },
    dispose() {
      unsubscribe()
      kit.dispose()
    }
  }
}
