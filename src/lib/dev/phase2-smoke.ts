import { PART_A_MAX, PART_A_MIN, PART_B_MAX, PART_B_MIN } from '../types/practice'
import { convertNumberToWord } from '../utils/numberToWord'
import { generatePartAQuestion, generatePartBQuestion } from '../utils/random'

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message)
  }
}

const samples: Array<[number, string]> = [
  [100, 'one hundred'],
  [102, 'one hundred and two'],
  [219, 'two hundred and nineteen'],
  [340, 'three hundred and forty'],
  [999, 'nine hundred and ninety-nine']
]

for (const [num, expected] of samples) {
  const result = convertNumberToWord(num)
  assert(result === expected, `convertNumberToWord(${num}) expected "${expected}" got "${result}"`)
}

for (let i = 0; i < 100; i += 1) {
  const a = generatePartAQuestion()
  assert(a.value >= PART_A_MIN && a.value <= PART_A_MAX, `Part A value out of range: ${a.value}`)
  assert(a.word.length > 0, `Part A word should not be empty for ${a.value}`)

  const b = generatePartBQuestion()
  assert(b.left >= PART_B_MIN && b.left <= PART_B_MAX, `Part B left out of range: ${b.left}`)
  assert(b.right >= PART_B_MIN && b.right <= PART_B_MAX, `Part B right out of range: ${b.right}`)
  assert(b.additionAnswer === b.left + b.right, 'Part B addition answer mismatch')
  assert(b.subtractionLeft >= b.subtractionRight, 'Part B subtraction should use bigger minus smaller')
  assert(
    b.subtractionAnswer === b.subtractionLeft - b.subtractionRight,
    'Part B subtraction answer mismatch'
  )
}

console.log('Phase 2 smoke test passed.')

