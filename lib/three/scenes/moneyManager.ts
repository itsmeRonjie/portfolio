import { moneyManagerSite } from '~/data/moneyManagerSite'
import { phoneSpec } from '../devices/phone'
import { ParticleField } from '../fx/particles'
import { ImageCycler } from '../screens/imageCycler'
import type { SceneFactory } from '../stage'
import { SceneKit } from './shared'

const AUTO_CYCLE_SECONDS = 5
const IDLE_AFTER_INPUT_SECONDS = 10

export const moneyManagerScreens = moneyManagerSite.screenshots.filter((shot) => shot.textureSrc)

/**
 * Money Manager app site: one teal Android phone cycling the real screenshots in the hero.
 * On wide screens it flies down into the gallery and shows whichever screen is selected.
 */
export const createMoneyManagerScene: SceneFactory = (stage, { emit }) => {
  const kit = new SceneKit(stage)
  stage.addRimLights(0x31dbc2, 0x2c8f82)

  const spec = phoneSpec('android')
  const cycler = new ImageCycler(
    stage,
    { urls: moneyManagerScreens.map((shot) => shot.textureSrc!), screen: spec.screen },
    kit.bin
  )

  kit.actors.push(new ParticleField(stage, { slot: 'mm.hero', colors: [0x31dbc2, 0x8ff4e3], count: 110 }, kit.bin))

  const phone = kit.phone(
    'android',
    { frame: 0x2a4a44, back: 0x0d2a26, accent: 0x31dbc2 },
    cycler.material,
    [
      { slot: 'mm.hero', pose: { yaw: -0.3, pitch: 0.05, roll: -0.02 } },
      { slot: 'mm.gallery', wideOnly: true, pose: { yaw: 0.2, pitch: 0.03 } }
    ],
    { float: { amplitude: 0.045, speed: 0.9 }, spin: 1.2, lift: 1.5, introDelay: 0.15, glow: 0.3 }
  )

  let clock = 0
  let now = 0
  let lastInput = -Infinity

  const showScreen = (index: number) => {
    cycler.show(index)
    emit('screen', ((index % cycler.count) + cycler.count) % cycler.count)
  }

  kit.tick((frame) => {
    now = frame.time
    const busy = cycler.update(frame.dt)
    // Auto-advance only in the hero; in the gallery the visitor picks the screen.
    if (!frame.reducedMotion && phone.actor.currentSlot === 'mm.hero' && now - lastInput > IDLE_AFTER_INPUT_SECONDS) {
      clock += frame.dt
      if (clock > AUTO_CYCLE_SECONDS) {
        clock = 0
        showScreen(cycler.index + 1)
      }
    }
    return busy
  })

  for (const actor of kit.actors) {
    stage.addActor(actor)
  }

  return {
    actors: kit.actors,
    slots: (wide) => phone.actor.slots(wide),
    pointer(_slot, phase, data) {
      lastInput = now
      if (phase === 'tap') {
        clock = 0
        showScreen(cycler.index + 1)
        return
      }
      phone.actor.pointer(phase, data)
    },
    command(name, ...args) {
      lastInput = now
      if (name === 'screen') {
        clock = 0
        showScreen(Number(args[0]) || 0)
      }
    },
    dispose() {
      kit.dispose()
    }
  }
}
