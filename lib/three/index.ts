// Entry point for the lazily loaded 3D chunk. Nothing here may run on the server.
import { createDinkBoardScene } from './scenes/dinkBoard'
import { createMoneyManagerScene } from './scenes/moneyManager'
import { createPortfolioScene } from './scenes/portfolio'
import type { SceneFactory } from './stage'

export { Stage } from './stage'
export type { SceneHandle } from './stage'

export type SceneName = 'portfolio' | 'money-manager' | 'dinkboard'

export const scenes: Record<SceneName, SceneFactory> = {
  portfolio: createPortfolioScene,
  'money-manager': createMoneyManagerScene,
  dinkboard: createDinkBoardScene
}
