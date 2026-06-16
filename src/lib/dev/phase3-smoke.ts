import { get } from 'svelte/store'

import { PART_A_GOAL, PART_B_GOAL } from '../types/practice'
import { practiceProgress, practiceStore } from '../stores/practiceStore'

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message)
  }
}

practiceStore.resetDaily()

let state = get(practiceStore)
assert(state.partADone === 0, 'Part A should start at 0')
assert(state.partBDone === 0, 'Part B should start at 0')
assert(state.stars === 0, 'Stars should start at 0')

for (let i = 0; i < PART_A_GOAL + 2; i += 1) {
  practiceStore.generatePartA()
}

state = get(practiceStore)
assert(state.partAQuestion !== null, 'Part A question should exist after generation')
assert(state.partADone === PART_A_GOAL, 'Part A count should be capped at goal')

practiceStore.togglePartAWord()
state = get(practiceStore)
assert(state.showPartAWord, 'Part A word should toggle on')

for (let i = 0; i < PART_B_GOAL + 3; i += 1) {
  practiceStore.generatePartB()
}

state = get(practiceStore)
const progress = get(practiceProgress)

assert(state.partBQuestion !== null, 'Part B question should exist after generation')
assert(state.partBDone === PART_B_GOAL, 'Part B count should be capped at goal')
assert(progress.isComplete, 'Progress should be complete after goals are reached')
assert(state.celebrationShown, 'Celebration should trigger once complete')
assert(state.stars === 1, 'Exactly one star should be awarded on first completion')

practiceStore.generatePartB()
state = get(practiceStore)
assert(state.stars === 1, 'Star count should not keep increasing after completion')

practiceStore.resetDaily()
state = get(practiceStore)
assert(state.partADone === 0 && state.partBDone === 0, 'Reset should clear daily counts')
assert(state.stars === 1, 'Reset should keep existing stars')
assert(!state.celebrationShown, 'Reset should clear celebration state')

console.log('Phase 3 smoke test passed.')

