<template>
  <div
    ref="element"
    class="stage-slot"
    :class="{ 'is-live': isLive, 'is-interactive': interactive, 'is-dragging': dragging }"
    :data-stage-slot="id"
    @pointerdown="onDown"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointercancel="onCancel"
    @lostpointercapture="onCancel"
  >
    <div class="stage-slot__fallback">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * A placeholder the 3D stage docks a device into. It server-renders its fallback (a static
 * device mock), which fades out once the WebGL device is actually drawn here. While live, it
 * also turns drags into spins and taps into device actions.
 */
const props = withDefaults(defineProps<{ id: string; interactive?: boolean }>(), { interactive: true })

const stage = useStage()
const element = ref<HTMLElement | null>(null)
const dragging = ref(false)

const isLive = computed(() => !!stage?.liveSlots.value.has(props.id))

const TAP_DISTANCE = 7
const TAP_MS = 320

let pointerId: number | null = null
let startX = 0
let startY = 0
let lastX = 0
let lastY = 0
let lastTime = 0
let startTime = 0
let velocityX = 0
let moved = false

const onDown = (event: PointerEvent) => {
  if (!stage || !isLive.value || !props.interactive || pointerId !== null) {
    return
  }
  if (event.pointerType === 'mouse' && event.button !== 0) {
    return
  }
  pointerId = event.pointerId
  startX = lastX = event.clientX
  startY = lastY = event.clientY
  startTime = lastTime = event.timeStamp
  velocityX = 0
  moved = false
  // Mouse drags can capture right away; touch waits until the gesture is clearly horizontal.
  if (event.pointerType === 'mouse') {
    element.value?.setPointerCapture(event.pointerId)
  }
}

const onMove = (event: PointerEvent) => {
  if (!stage || event.pointerId !== pointerId) {
    return
  }
  const dx = event.clientX - lastX
  const dy = event.clientY - lastY
  const elapsed = Math.max(event.timeStamp - lastTime, 1)

  if (!moved) {
    const totalX = event.clientX - startX
    const totalY = event.clientY - startY
    if (Math.hypot(totalX, totalY) < TAP_DISTANCE) {
      return
    }
    moved = true
    dragging.value = true
    element.value?.setPointerCapture(event.pointerId)
    stage.pointer(props.id, 'start', { dx: 0, dy: 0, vx: 0 })
  }

  velocityX = velocityX * 0.6 + ((dx / elapsed) * 1000) * 0.4
  lastX = event.clientX
  lastY = event.clientY
  lastTime = event.timeStamp
  stage.pointer(props.id, 'move', { dx, dy, vx: velocityX })
}

const finish = (event: PointerEvent, cancelled: boolean) => {
  if (!stage || event.pointerId !== pointerId) {
    return
  }
  pointerId = null
  dragging.value = false

  if (moved) {
    // A pause before release means the visitor stopped the spin: no fling.
    const stale = event.timeStamp - lastTime > 90
    stage.pointer(props.id, 'end', { dx: 0, dy: 0, vx: stale ? 0 : velocityX })
  } else if (!cancelled && event.timeStamp - startTime < TAP_MS) {
    stage.pointer(props.id, 'tap', { dx: 0, dy: 0, vx: 0 })
  }
  moved = false
}

const onUp = (event: PointerEvent) => finish(event, false)
const onCancel = (event: PointerEvent) => finish(event, true)

onMounted(() => {
  if (element.value) {
    stage?.registerSlot(props.id, element.value)
  }
})

onBeforeUnmount(() => {
  if (element.value) {
    stage?.unregisterSlot(props.id, element.value)
  }
})
</script>
