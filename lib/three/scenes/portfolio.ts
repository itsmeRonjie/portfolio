import { moneyManagerSite } from '~/data/moneyManagerSite'
import { phoneSpec } from '../devices/phone'
import { watchSpec } from '../devices/watch'
import { ParticleField } from '../fx/particles'
import { ImageCycler } from '../screens/imageCycler'
import { ScoreboardScreen } from '../screens/scoreboard'
import type { SceneFactory } from '../stage'
import { createPulse, pointerToDevice, SceneKit } from './shared'

const AUTO_CYCLE_SECONDS = 4.6
const AUTOPLAY_SECONDS = 3.4
const IDLE_AFTER_INPUT_SECONDS = 8

export const portfolioScreens = moneyManagerSite.screenshots.filter((shot) => shot.textureSrc)

/**
 * Home page story: an Android phone running Money Manager and an iPhone running a live
 * DinkBoard scoreboard float in the hero, then (on wide screens) fly down to dock into
 * their case studies and finally flank the contact call-to-action.
 */
export const createPortfolioScene: SceneFactory = (stage, { emit, score }) => {
  const kit = new SceneKit(stage)
  stage.addRimLights(0x3ddc84, 0x5ac8fa)

  const android = phoneSpec('android')
  const ios = phoneSpec('ios')

  const cycler = new ImageCycler(
    stage,
    { urls: portfolioScreens.map((shot) => shot.textureSrc!), screen: android.screen },
    kit.bin
  )
  const hostBoard = new ScoreboardScreen(
    stage,
    { variant: 'host', cutout: 'island', screen: ios.screen, initial: score.get() },
    kit.bin
  )
  const watchBoard = new ScoreboardScreen(
    stage,
    { variant: 'watch', screen: watchSpec.screen, initial: score.get() },
    kit.bin
  )

  kit.actors.push(new ParticleField(stage, { slot: 'hero.stage', colors: [0x3ddc84, 0x5ac8fa] }, kit.bin))

  kit.tiles('hero.stage', 0x9aa4b0, [
    { icon: '/icons/kotlin.svg', x: 0.1, y: 0.16, size: 0.12, yaw: 0.5, delay: 0.5 },
    { icon: '/icons/jetpackcompose.svg', x: 0.9, y: 0.12, size: 0.11, yaw: -0.45, delay: 0.62 },
    { icon: '/icons/swift.svg', x: 0.05, y: 0.8, size: 0.11, yaw: 0.4, delay: 0.74 },
    { icon: '/icons/swiftui.svg', x: 0.93, y: 0.86, size: 0.12, yaw: -0.5, delay: 0.86 }
  ])

  const devices = {
    ios: kit.phone(
      'ios',
      { frame: 0xa8aeb6, back: 0x1c2733, accent: 0x5ac8fa },
      hostBoard.material,
      [
        { slot: 'hero.ios', pose: { yaw: 0.42, pitch: 0.06, roll: 0.03, z: -0.9 } },
        { slot: 'work.dinkboard', wideOnly: true, pose: { yaw: 0.3, pitch: 0.04, x: -0.1, scale: 0.86 } },
        { slot: 'contact.left', wideOnly: true, pose: { yaw: 0.55, roll: 0.06 } }
      ],
      { float: { amplitude: 0.05, speed: 0.8, phase: 1.4 }, spin: 1.1, lift: 1.4, introDelay: 0.32, parallax: 0.12 }
    ),
    android: kit.phone(
      'android',
      { frame: 0x30363e, back: 0x16231d, accent: 0x3ddc84 },
      cycler.material,
      [
        { slot: 'hero.android', pose: { yaw: -0.34, pitch: 0.05, roll: -0.025, z: 0.4 } },
        { slot: 'work.money-manager', wideOnly: true, pose: { yaw: -0.3, pitch: 0.04, scale: 0.86 } },
        { slot: 'contact.right', wideOnly: true, pose: { yaw: -0.55, roll: -0.06 } }
      ],
      { float: { amplitude: 0.05, speed: 0.92 }, spin: -1.1, lift: 1.6, introDelay: 0.12, parallax: 0.12 }
    ),
    watch: kit.watch(
      { case: 0x8f969e, band: 0x26381d },
      0x8bca1e,
      watchBoard.material,
      [
        {
          slot: 'work.dinkboard',
          wideOnly: true,
          region: { x: 0.84, y: 0.66, height: 0.36 },
          pose: { yaw: -0.4, pitch: 0.1, z: 0.6 },
          appear: true
        }
      ],
      { float: { amplitude: 0.06, speed: 1.1, phase: 2.2 }, parallax: 0.16 }
    )
  }

  const watchPulse = createPulse(devices.watch)
  const unsubscribe = score.subscribe((snapshot) => {
    hostBoard.set(snapshot)
    // The wrist mirror updates a beat later, as it would over the air.
    window.setTimeout(() => watchBoard.set(snapshot), 160)
    watchPulse.fire(0.16)
  })

  let screenClock = 0
  let playClock = 0
  let now = 0
  let lastInput = -Infinity

  const showScreen = (index: number) => {
    cycler.show(index)
    emit('screen', ((index % cycler.count) + cycler.count) % cycler.count)
  }

  kit.tick((frame) => {
    now = frame.time
    let busy = cycler.update(frame.dt)
    busy = hostBoard.update(frame.dt) || busy
    busy = watchBoard.update(frame.dt) || busy
    busy = watchPulse.update(frame.dt) || busy

    const idle = frame.time - lastInput > IDLE_AFTER_INPUT_SECONDS
    if (!frame.reducedMotion && idle) {
      if (devices.android.actor.currentSlot && stage.slotRect(devices.android.actor.currentSlot)) {
        screenClock += frame.dt
        if (screenClock > AUTO_CYCLE_SECONDS) {
          screenClock = 0
          showScreen(cycler.index + 1)
        }
      }
      if (devices.ios.actor.currentSlot) {
        playClock += frame.dt
        if (playClock > AUTOPLAY_SECONDS) {
          playClock = 0
          score.score(Math.random() < 0.55 ? score.get().serving : score.get().serving === 'home' ? 'away' : 'home')
        }
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
        if (device === devices.android) {
          screenClock = 0
          showScreen(cycler.index + 1)
        } else {
          score.score('home')
        }
        return
      }
      device.actor.pointer(phase, data)
    },
    command(name, ...args) {
      lastInput = now
      if (name === 'screen') {
        screenClock = 0
        showScreen(Number(args[0]) || 0)
      }
    },
    dispose() {
      unsubscribe()
      kit.dispose()
    }
  }
}
