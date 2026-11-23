<template>
  <div ref="root" class="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
    <!-- Exploded view of the layers. Decorative twin of the list beside it, so hidden from assistive tech. -->
    <div
      class="arch-scene"
      :class="{ 'is-open': open }"
      aria-hidden="true"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
    >
      <div class="arch-floor" />
      <div ref="stack" class="arch-stack">
        <div
          v-for="(layer, index) in layers"
          :key="layer.id"
          class="arch-layer"
          :class="{ 'is-active': active === index }"
          :style="{ '--i': layers.length - 1 - index, '--tone': layer.color }"
          @pointerenter="active = index"
        >
          <span class="arch-layer__role">{{ layer.role }}</span>
          <span class="arch-layer__label">
            <span class="arch-layer__icon"><ToolIcon :icon="layer.icon" /></span>
            {{ layer.name }}
          </span>
        </div>
        <!-- Events travel down through the layers; state travels back up. -->
        <span class="arch-pulse arch-pulse--down" />
        <span class="arch-pulse arch-pulse--up" />
      </div>
    </div>

    <ol class="space-y-2.5">
      <li v-for="(layer, index) in layers" :key="layer.id" v-reveal="{ delay: index * 70 }">
        <button
          type="button"
          class="arch-row w-full rounded-2xl border p-4 text-left transition-all duration-500 ease-spring"
          :class="active === index ? 'is-active bg-surface' : 'border-border/50 bg-surface/40 hover:bg-surface/70'"
          :style="{ '--tone': layer.color }"
          :aria-pressed="active === index"
          @click="active = index"
          @pointerenter="active = index"
          @focus="active = index"
        >
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span class="arch-row__dot" aria-hidden="true" />
            <h3 class="text-base font-semibold text-white">{{ layer.name }}</h3>
            <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">{{ layer.role }}</span>
            <span class="ml-auto flex flex-wrap gap-1.5">
              <span v-for="part in layer.parts" :key="part" class="ui-chip font-mono !px-2 !py-0.5 !text-[10px]">{{ part }}</span>
            </span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-slate-300">{{ layer.description }}</p>
        </button>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import ToolIcon from '~/components/ToolIcon.vue'
import { architectureLayers } from '~/data/architecture'

/**
 * MVVM + Clean Architecture as an exploded stack. Pure CSS 3D (no WebGL), so it works on every
 * device: the sheets separate when the block scrolls into view, the hovered or focused layer
 * lifts out, and the whole stack leans a little toward the pointer.
 */
const layers = architectureLayers
const active = ref(0)
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const stack = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()

let observer: IntersectionObserver | null = null
let frame = 0

const onPointerMove = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse' || reducedMotion.value || !stack.value) {
    return
  }
  const box = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const x = (event.clientX - box.left) / box.width - 0.5
  const y = (event.clientY - box.top) / box.height - 0.5
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    stack.value?.style.setProperty('--lean-x', `${(-y * 10).toFixed(2)}deg`)
    stack.value?.style.setProperty('--lean-z', `${(x * 14).toFixed(2)}deg`)
  })
}

const onPointerLeave = () => {
  cancelAnimationFrame(frame)
  stack.value?.style.setProperty('--lean-x', '0deg')
  stack.value?.style.setProperty('--lean-z', '0deg')
}

onMounted(() => {
  if (!root.value) {
    return
  }
  // Fan the layers out the first time the block is properly on screen.
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        open.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.35 }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<style scoped>
.arch-scene {
  position: relative;
  display: grid;
  height: 340px;
  place-items: center;
  perspective: 1500px;
}

.arch-floor {
  position: absolute;
  bottom: 6%;
  left: 50%;
  width: 72%;
  height: 26%;
  translate: -50% 0;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(61, 220, 132, 0.2), rgba(90, 200, 250, 0.08) 60%, transparent);
}

.arch-stack {
  --gap: 12px;
  --top: calc(var(--gap) * 3 + 30px);
  position: relative;
  width: min(62vw, 290px);
  aspect-ratio: 1.5;
  transform-style: preserve-3d;
  /* Isometric-style view; the lean variables follow the pointer. */
  transform: translateY(56px) rotateX(calc(58deg + var(--lean-x, 0deg))) rotateZ(calc(-40deg + var(--lean-z, 0deg)));
  transition: transform 0.7s var(--ease-spring);
}

.is-open .arch-stack {
  --gap: 62px;
}

.arch-layer {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgb(var(--tone) / 0.5);
  border-radius: 24px;
  padding: 14px 16px;
  background:
    linear-gradient(rgb(var(--tone) / 0.07) 1px, transparent 1px) 0 0 / 100% 22px,
    linear-gradient(90deg, rgb(var(--tone) / 0.07) 1px, transparent 1px) 0 0 / 22px 100%,
    linear-gradient(135deg, rgb(var(--tone) / 0.26), rgba(9, 14, 22, 0.94) 72%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 26px 50px rgba(0, 0, 0, 0.5);
  opacity: 0.9;
  transform: translateZ(calc(var(--i) * var(--gap)));
  transition:
    transform 0.95s var(--ease-spring),
    opacity 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  /* Lower layers settle first, so the stack opens from the bottom up. */
  transition-delay: calc(var(--i) * 70ms), 0ms, 0ms, 0ms;
}

.arch-layer.is-active {
  border-color: rgb(var(--tone) / 0.95);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 0 46px rgb(var(--tone) / 0.42),
    0 26px 50px rgba(0, 0, 0, 0.5);
  opacity: 1;
  transform: translateZ(calc(var(--i) * var(--gap) + 24px));
  transition-delay: 0ms;
}

.arch-layer__role {
  align-self: flex-end;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgb(var(--tone) / 0.85);
}

.arch-layer__label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fff;
}

.arch-layer__icon {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid rgb(var(--tone) / 0.45);
  border-radius: 11px;
  background: rgb(var(--tone) / 0.14);
  color: rgb(var(--tone));
}

.arch-pulse {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  margin: -6px;
  border-radius: 999px;
  opacity: 0;
}

.is-open .arch-pulse--down {
  left: 38%;
  background: #5ac8fa;
  box-shadow: 0 0 18px 4px rgba(90, 200, 250, 0.7);
  animation: arch-down 3.4s linear infinite;
}

.is-open .arch-pulse--up {
  left: 62%;
  background: #3ddc84;
  box-shadow: 0 0 18px 4px rgba(61, 220, 132, 0.7);
  animation: arch-up 3.4s linear 1.7s infinite;
}

/* --top is the height of the opened stack, so the pulses always span it exactly. */
@keyframes arch-down {
  0% {
    opacity: 0;
    transform: translateZ(var(--top));
  }
  12%,
  88% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateZ(-14px);
  }
}

@keyframes arch-up {
  0% {
    opacity: 0;
    transform: translateZ(-14px);
  }
  12%,
  88% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateZ(var(--top));
  }
}

.arch-row.is-active {
  border-color: rgb(var(--tone) / 0.6);
  box-shadow: 0 0 34px rgb(var(--tone) / 0.12);
}

.arch-row__dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: rgb(var(--tone));
  box-shadow: 0 0 12px rgb(var(--tone) / 0.7);
}

@media (min-width: 640px) {
  .arch-scene {
    height: 440px;
  }

  .arch-stack {
    transform: translateY(70px) rotateX(calc(58deg + var(--lean-x, 0deg))) rotateZ(calc(-40deg + var(--lean-z, 0deg)));
  }

  .is-open .arch-stack {
    --gap: 74px;
  }

}

@media print {
  .arch-pulse {
    display: none;
  }
}
</style>
