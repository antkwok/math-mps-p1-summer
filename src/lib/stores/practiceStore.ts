import { derived, writable, type Readable } from 'svelte/store'

import {
  loadPersistedPracticeState,
  savePersistedPracticeState,
  getTodayKey,
  type PersistedPracticeState
} from '../services/storage'
import { PART_A_GOAL, PART_B_GOAL, type PracticeProgress, type PracticeState } from '../types/practice'
import { generatePartAQuestion, generatePartBQuestion } from '../utils/random'

const ENCOURAGEMENTS = [
  'Great try! Keep going!',
  'You are doing awesome!',
  'Math hero in progress!',
  'Nice work! One step closer!',
  'Super focus! Keep it up!'
] as const

function clampToGoal(value: number, goal: number): number {
  return Math.min(Math.max(value, 0), goal)
}

function randomEncouragement(): string {
  const index = Math.floor(Math.random() * ENCOURAGEMENTS.length)
  return ENCOURAGEMENTS[index]
}

function createInitialState(stars = 0): PracticeState {
  return {
    partAQuestion: null,
    partBQuestion: null,
    showPartAWord: false,
    showPartBAnswers: false,
    partADone: 0,
    partBDone: 0,
    stars,
    celebrationShown: false,
    encouragementMessage: ''
  }
}

export function createStateFromPersistence(
  persisted: PersistedPracticeState | null,
  todayKey = getTodayKey()
): PracticeState {
  if (!persisted) {
    return createInitialState()
  }

  if (persisted.lastActiveDate !== todayKey) {
    return createInitialState(persisted.stars)
  }

  return {
    ...createInitialState(persisted.stars),
    partADone: persisted.partADone,
    partBDone: persisted.partBDone,
    celebrationShown: persisted.celebrationShown
  }
}

function createHydratedState(): PracticeState {
  const persisted = loadPersistedPracticeState()

  return createStateFromPersistence(persisted, getTodayKey())
}

function computeProgress(state: PracticeState): PracticeProgress {
  const doneTotal = state.partADone + state.partBDone
  const goalTotal = PART_A_GOAL + PART_B_GOAL

  return {
    doneTotal,
    goalTotal,
    progressRatio: goalTotal === 0 ? 0 : doneTotal / goalTotal,
    isComplete: state.partADone >= PART_A_GOAL && state.partBDone >= PART_B_GOAL
  }
}

function maybeCelebrate(state: PracticeState): PracticeState {
  const progress = computeProgress(state)

  if (!progress.isComplete || state.celebrationShown) {
    return state
  }

  return {
    ...state,
    celebrationShown: true,
    stars: state.stars + 1,
    encouragementMessage: 'You finished today\'s practice!'
  }
}

function createPracticeStore() {
  const { subscribe, set, update } = writable<PracticeState>(createHydratedState())

  subscribe((state) => {
    savePersistedPracticeState(state)
  })

  return {
    subscribe,
    generatePartA: (): void => {
      update((state) => {
        const next: PracticeState = {
          ...state,
          partAQuestion: generatePartAQuestion(),
          showPartAWord: false,
          partADone: clampToGoal(state.partADone + 1, PART_A_GOAL),
          encouragementMessage: randomEncouragement()
        }

        return maybeCelebrate(next)
      })
    },
    generatePartB: (): void => {
      update((state) => {
        const next: PracticeState = {
          ...state,
          partBQuestion: generatePartBQuestion(),
          showPartBAnswers: false,
          partBDone: clampToGoal(state.partBDone + 1, PART_B_GOAL),
          encouragementMessage: randomEncouragement()
        }

        return maybeCelebrate(next)
      })
    },
    togglePartAWord: (): void => {
      update((state) => {
        if (!state.partAQuestion) {
          return state
        }

        return {
          ...state,
          showPartAWord: !state.showPartAWord
        }
      })
    },
    togglePartBAnswers: (): void => {
      update((state) => {
        if (!state.partBQuestion) {
          return state
        }

        return {
          ...state,
          showPartBAnswers: !state.showPartBAnswers
        }
      })
    },
    resetDaily: (): void => {
      update((state) => createInitialState(state.stars))
    },
    hydrate: (nextState: PracticeState): void => {
      set(nextState)
    }
  }
}

export const practiceStore = createPracticeStore()

export const practiceProgress: Readable<PracticeProgress> = derived(practiceStore, (state) =>
  computeProgress(state)
)

