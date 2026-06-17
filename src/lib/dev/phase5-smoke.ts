import {
  parsePersistedPracticeState,
  PRACTICE_STORAGE_KEY,
  savePersistedPracticeState,
  loadPersistedPracticeState,
  toPersistedPracticeState,
  parsePersistedProfileState,
  PROFILE_STORAGE_KEY,
  savePersistedProfileState,
  loadPersistedProfileState,
  type PersistedPracticeState
} from '../services/storage'
import { createStateFromPersistence } from '../stores/practiceStore'
import type { PracticeState } from '../types/practice'

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message)
  }
}

const memory = new Map<string, string>()
const storage = {
  getItem(key: string): string | null {
    return memory.get(key) ?? null
  },
  setItem(key: string, value: string): void {
    memory.set(key, value)
  }
}

const baseState: PracticeState = {
  partAQuestion: null,
  partBQuestion: null,
  showPartAWord: false,
  showPartBAnswers: false,
  partADone: 3,
  partBDone: 7,
  stars: 2,
  celebrationShown: false,
  encouragementMessage: 'Good job!'
}

const payload = toPersistedPracticeState(baseState, '2026-06-16')
assert(payload.partADone === 3, 'Payload should keep Part A progress')
assert(payload.partBDone === 7, 'Payload should keep Part B progress')
assert(payload.stars === 2, 'Payload should keep stars')

const parsed = parsePersistedPracticeState(JSON.stringify(payload))
assert(parsed !== null, 'Valid payload should parse')

savePersistedPracticeState(baseState, storage, '2026-06-16')
const loaded = loadPersistedPracticeState(storage)
assert(loaded !== null, 'Saved payload should be loadable')
assert(loaded?.lastActiveDate === '2026-06-16', 'Date should be saved')

savePersistedProfileState({ studentName: ' Alyssa ' }, storage)
const profile = loadPersistedProfileState(storage)
assert(profile?.studentName === 'Alyssa', 'Profile name should be normalized')
assert(parsePersistedProfileState(storage.getItem(PROFILE_STORAGE_KEY))?.studentName === 'Alyssa', 'Profile payload should parse')

const restoredToday = createStateFromPersistence(loaded as PersistedPracticeState, '2026-06-16')
assert(restoredToday.partADone === 3 && restoredToday.partBDone === 7, 'Same-day restore keeps counters')

const restoredTomorrow = createStateFromPersistence(loaded as PersistedPracticeState, '2026-06-17')
assert(restoredTomorrow.partADone === 0 && restoredTomorrow.partBDone === 0, 'Next-day restore resets counters')
assert(restoredTomorrow.stars === 2, 'Next-day restore keeps stars')

assert(storage.getItem(PRACTICE_STORAGE_KEY) !== null, 'Storage key should be populated')

console.log('Phase 5 smoke test passed.')
