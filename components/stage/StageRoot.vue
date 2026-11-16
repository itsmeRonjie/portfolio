<template>
  <div class="stage-root">
    <slot />
    <canvas v-if="enabled" ref="canvas" class="stage-canvas" :class="{ 'is-live': live }" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { createScoreStore } from '~/lib/scoreStore'
import type { ScoreSnapshot } from '~/lib/scoreStore'
import { STAGE_KEY } from '~/composables/useStage'
import type { StageContext } from '~/composables/useStage'

type SceneName = 'portfolio' | 'money-manager' | 'dinkboard'
type StageModule = typeof import('~/lib/three')
type StageInstance = InstanceType<StageModule['Stage']>
type SceneHandle = import('~/lib/three').SceneHandle

const props = defineProps<{ scene: SceneName }>()

const route = useRoute()
const reducedMotion = useReducedMotion()

const canvas = ref<HTMLCanvasElement | null>(null)
const enabled = ref(false)
const live = ref(false)
const liveSlots = shallowRef<ReadonlySet<string>>(new Set())
const events = reactive<Record<string, unknown>>({})

const score = createScoreStore()
const scoreState = shallowRef<ScoreSnapshot>(score.get())
const stopScore = score.subscribe((snapshot) => {
  scoreState.value = snapshot
})

const slotElements = new Map<string, HTMLElement>()
let stage: StageInstance | null = null
let handle: SceneHandle | null = null
let idleHandle = 0
let disposed = false

const context: StageContext = {
  live,
  liveSlots,
  events,
  score,
  scoreState,
  registerSlot(id, element) {
    slotElements.set(id, element)
    stage?.invalidate()
  },
  unregisterSlot(id, element) {
    if (slotElements.get(id) === element) {
      slotElements.delete(id)
    }
  },
  pointer(slot, phase, data) {
    handle?.pointer(slot, phase, data)
  },
  command(name, ...args) {
    handle?.command(name, ...args)
  }
}

provide(STAGE_KEY, context)

/** Reasons to keep the static devices: an explicit opt-out, data saver, or no WebGL2. */
const shouldRender = () => {
  if ('no3d' in route.query) {
    return false
  }
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) {
    return false
  }
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

const teardown = () => {
  handle?.dispose()
  handle = null
  stage?.dispose()
  stage = null
  live.value = false
  liveSlots.value = new Set()
}

const boot = async () => {
  if (disposed || !shouldRender()) {
    return
  }

  enabled.value = true
  await nextTick()
  const element = canvas.value
  if (!element || disposed) {
    return
  }

  try {
    const module = await import('~/lib/three')
    if (disposed) {
      return
    }

    stage = new module.Stage({
      canvas: element,
      reducedMotion: reducedMotion.value,
      resolveSlot: (id) => slotElements.get(id) ?? null,
      onContextLost: () => {
        // Losing the GPU mid-session: fall back to the static devices for the rest of the visit.
        teardown()
        enabled.value = false
      },
      onWideChange: (wide) => {
        if (live.value && handle) {
          liveSlots.value = new Set(handle.slots(wide))
        }
      }
    })

    const emit = (event: string, ...args: unknown[]) => {
      events[event] = args.length > 1 ? args : args[0]
    }
    handle = await module.scenes[props.scene](stage, { emit, score })
    if (disposed) {
      teardown()
      return
    }

    stage.start(() => {
      if (!stage || !handle) {
        return
      }
      live.value = true
      liveSlots.value = new Set(handle.slots(stage.wide))
    })
  } catch (error) {
    if (import.meta.dev) {
      console.warn('[stage] 3D disabled:', error)
    }
    teardown()
    enabled.value = false
  }
}

watch(reducedMotion, (value) => stage?.setReducedMotion(value))

onMounted(() => {
  // Load three.js after the page is interactive so it never competes with first paint.
  const run = () => void boot()
  if ('requestIdleCallback' in window) {
    idleHandle = window.requestIdleCallback(run, { timeout: 1200 })
  } else {
    idleHandle = window.setTimeout(run, 300) as unknown as number
  }
})

onBeforeUnmount(() => {
  disposed = true
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(idleHandle)
  }
  window.clearTimeout(idleHandle)
  stopScore()
  teardown()
})
</script>
