/**
 * A tiny pickleball score model shared by the DinkBoard demo UI and the 3D devices.
 * Framework-free on purpose: Vue reads it through `subscribe`, and the WebGL
 * scoreboards redraw from the same snapshots, so every surface stays in sync.
 *
 * Rally scoring to 11, win by 2. It illustrates the app; it is not the app's reducer.
 */

export type ScoreSide = 'home' | 'away'

export type ScoreSnapshot = {
  home: number
  away: number
  serving: ScoreSide
  /** Server number on the serving side (1 or 2). */
  server: 1 | 2
  rally: number
  winner: ScoreSide | null
  canUndo: boolean
  /** Side that scored the most recent point, for highlight animations. */
  lastScored: ScoreSide | null
  /** Increments on every change. */
  version: number
}

export type ScoreStore = {
  get(): ScoreSnapshot
  score(side: ScoreSide): void
  undo(): void
  subscribe(listener: (snapshot: ScoreSnapshot) => void): () => void
}

type ScoreState = Omit<ScoreSnapshot, 'canUndo' | 'version'>

const TARGET = 11
const MAX_HISTORY = 40

export const SCORE_TEAMS = { home: 'North End', away: 'South Line' } as const

export const INITIAL_SCORE: ScoreSnapshot = {
  home: 8,
  away: 6,
  serving: 'home',
  server: 1,
  rally: 11,
  winner: null,
  canUndo: false,
  lastScored: null,
  version: 0
}

export const createScoreStore = (): ScoreStore => {
  const history: ScoreState[] = []
  const listeners = new Set<(snapshot: ScoreSnapshot) => void>()
  let version = 0
  let state: ScoreState = {
    home: INITIAL_SCORE.home,
    away: INITIAL_SCORE.away,
    serving: INITIAL_SCORE.serving,
    server: INITIAL_SCORE.server,
    rally: INITIAL_SCORE.rally,
    winner: null,
    lastScored: null
  }

  const get = (): ScoreSnapshot => ({ ...state, canUndo: history.length > 0, version })

  const commit = (next: ScoreState) => {
    state = next
    version += 1
    const snapshot = get()
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  return {
    get,
    score(side) {
      history.push(state)
      if (history.length > MAX_HISTORY) {
        history.shift()
      }

      // A finished game starts the next one on the following point.
      const base: ScoreState = state.winner
        ? { home: 0, away: 0, serving: state.winner, server: 1, rally: 0, winner: null, lastScored: null }
        : state

      const home = base.home + (side === 'home' ? 1 : 0)
      const away = base.away + (side === 'away' ? 1 : 0)
      const lead = Math.abs(home - away)
      const won = Math.max(home, away) >= TARGET && lead >= 2

      commit({
        home,
        away,
        serving: side,
        // The serve changing hands flips the server number.
        server: side === base.serving ? base.server : base.server === 1 ? 2 : 1,
        rally: base.rally + 1,
        winner: won ? side : null,
        lastScored: side
      })
    },
    undo() {
      const previous = history.pop()
      if (previous) {
        commit({ ...previous, lastScored: null })
      }
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    }
  }
}
