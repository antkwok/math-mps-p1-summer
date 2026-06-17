import { PART_A_GOAL, PART_B_GOAL, type PracticeState } from '../types/practice'
import { DEFAULT_CHECKLIST_ITEMS, type ChecklistItem } from '../types/checklist'

export const PRACTICE_STORAGE_KEY = 'math-pwa.practice.v1'
export const PROFILE_STORAGE_KEY = 'math-pwa.profile.v1'
export const CHECKLIST_STORAGE_KEY = 'math-pwa.checklist.v1'

export interface PersistedPracticeState {
  lastActiveDate: string
  partADone: number
  partBDone: number
  stars: number
  celebrationShown: boolean
}

export interface PersistedProfileState {
  studentName: string
}

export interface PersistedChecklistState {
  items: Array<{ id: string; completed: boolean }>
}

interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export function getTodayKey(now = new Date()): string {
  return now.toISOString().slice(0, 10)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function asFiniteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null
}

export function normalizeStudentName(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  return trimmed.slice(0, 40)
}

export function parsePersistedPracticeState(raw: string | null): PersistedPracticeState | null {
  if (!raw) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(raw)

    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    const value = parsed as Record<string, unknown>
    const lastActiveDate = asNonEmptyString(value.lastActiveDate)
    const partADone = asFiniteNumber(value.partADone)
    const partBDone = asFiniteNumber(value.partBDone)
    const stars = asFiniteNumber(value.stars)
    const celebrationShown = asBoolean(value.celebrationShown)

    if (
      lastActiveDate === null ||
      partADone === null ||
      partBDone === null ||
      stars === null ||
      celebrationShown === null
    ) {
      return null
    }

    return {
      lastActiveDate,
      partADone: clamp(Math.trunc(partADone), 0, PART_A_GOAL),
      partBDone: clamp(Math.trunc(partBDone), 0, PART_B_GOAL),
      stars: clamp(Math.trunc(stars), 0, Number.MAX_SAFE_INTEGER),
      celebrationShown
    }
  } catch {
    return null
  }
}

export function toPersistedPracticeState(state: PracticeState, lastActiveDate = getTodayKey()): PersistedPracticeState {
  return {
    lastActiveDate,
    partADone: clamp(Math.trunc(state.partADone), 0, PART_A_GOAL),
    partBDone: clamp(Math.trunc(state.partBDone), 0, PART_B_GOAL),
    stars: clamp(Math.trunc(state.stars), 0, Number.MAX_SAFE_INTEGER),
    celebrationShown: state.celebrationShown
  }
}

function getBrowserStorage(): StorageLike | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null
  }

  return window.localStorage
}

export function loadPersistedPracticeState(storage = getBrowserStorage()): PersistedPracticeState | null {
  if (!storage) {
    return null
  }

  return parsePersistedPracticeState(storage.getItem(PRACTICE_STORAGE_KEY))
}

export function savePersistedPracticeState(
  state: PracticeState,
  storage = getBrowserStorage(),
  todayKey = getTodayKey()
): void {
  if (!storage) {
    return
  }

  const payload = toPersistedPracticeState(state, todayKey)
  storage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(payload))
}

export function parsePersistedProfileState(raw: string | null): PersistedProfileState | null {
  if (!raw) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(raw)

    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    const value = parsed as Record<string, unknown>
    const studentName = asNonEmptyString(value.studentName)

    if (studentName === null) {
      return null
    }

    return {
      studentName: normalizeStudentName(studentName) ?? studentName
    }
  } catch {
    return null
  }
}

export function loadPersistedProfileState(storage = getBrowserStorage()): PersistedProfileState | null {
  if (!storage) {
    return null
  }

  return parsePersistedProfileState(storage.getItem(PROFILE_STORAGE_KEY))
}

export function savePersistedProfileState(
  state: PersistedProfileState,
  storage = getBrowserStorage()
): void {
  if (!storage) {
    return
  }

  const normalizedName = normalizeStudentName(state.studentName)

  if (!normalizedName) {
    return
  }

  storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ studentName: normalizedName }))
}

export function parsePersistedChecklistState(raw: string | null): PersistedChecklistState | null {
  if (!raw) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(raw)

    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    const value = parsed as Record<string, unknown>
    const items = value.items

    if (!Array.isArray(items)) {
      return null
    }

    return {
      items: items.map((item: unknown) => {
        if (typeof item === 'object' && item !== null) {
          const obj = item as Record<string, unknown>
          const id = typeof obj.id === 'string' ? obj.id : ''
          return {
            id,
            completed: asBoolean(obj.completed) ?? false
          }
        }
        return { id: '', completed: false }
      })
    }
  } catch {
    return null
  }
}

export function loadPersistedChecklistState(storage = getBrowserStorage()): ChecklistItem[] {
  if (!storage) {
    return DEFAULT_CHECKLIST_ITEMS.map((item) => ({ ...item, completed: false }))
  }

  const parsed = parsePersistedChecklistState(storage.getItem(CHECKLIST_STORAGE_KEY))

  if (!parsed) {
    return DEFAULT_CHECKLIST_ITEMS.map((item) => ({ ...item, completed: false }))
  }

  const completionMap = new Map(parsed.items.map((item) => [item.id, item.completed]))

  return DEFAULT_CHECKLIST_ITEMS.map((item) => ({
    ...item,
    completed: completionMap.get(item.id) ?? false
  }))
}

export function savePersistedChecklistState(items: ChecklistItem[], storage = getBrowserStorage()): void {
  if (!storage) {
    return
  }

  const payload: PersistedChecklistState = {
    items: items.map((item) => ({
      id: item.id,
      completed: item.completed
    }))
  }

  storage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(payload))
}
