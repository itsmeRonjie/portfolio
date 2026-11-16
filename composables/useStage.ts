import type { InjectionKey, Ref } from 'vue'
import type { ScoreSnapshot, ScoreStore } from '~/lib/scoreStore'

export type StagePointerPhase = 'start' | 'move' | 'end' | 'tap'
export type StagePointerData = { dx: number; dy: number; vx: number }

export type StageContext = {
  /** Slot ids currently rendered in 3D (their static fallbacks are hidden). */
  liveSlots: Ref<ReadonlySet<string>>
  /** True once the WebGL stage has drawn its first frame. */
  live: Ref<boolean>
  registerSlot(id: string, element: HTMLElement): void
  unregisterSlot(id: string, element: HTMLElement): void
  pointer(slot: string, phase: StagePointerPhase, data: StagePointerData): void
  command(name: string, ...args: unknown[]): void
  /** Last value of each scene event (for example `screen` -> index shown on the phone). */
  events: Record<string, unknown>
  score: ScoreStore
  scoreState: Ref<ScoreSnapshot>
}

export const STAGE_KEY: InjectionKey<StageContext> = Symbol('stage')

/** Access the surrounding <StageRoot>. Returns null outside one, so components work on any page. */
export const useStage = () => inject(STAGE_KEY, null)
