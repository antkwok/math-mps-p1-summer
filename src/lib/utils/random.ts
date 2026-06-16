import {
  PART_B_MAX,
  PART_B_MIN,
  type Digit,
  type PartAQuestion,
  type PartATriple,
  type PartBQuestion,
  type RandomQuestionOptions
} from '../types/practice'
import { convertNumberToWord } from './numberToWord'

function getRng(rng?: () => number): () => number {
  return rng ?? Math.random
}

function randomIntInclusive(min: number, max: number, rng: () => number): number {
  return Math.floor(rng() * (max - min + 1)) + min
}

export function generatePartAQuestion(options: RandomQuestionOptions = {}): PartAQuestion {
  const rng = getRng(options.rng)
  const hundreds = randomIntInclusive(1, 9, rng)
  const tens = randomIntInclusive(0, 9, rng) as Digit
  const ones = randomIntInclusive(0, 9, rng) as Digit

  const digits: PartATriple = [hundreds, tens, ones]
  const value = hundreds * 100 + tens * 10 + ones

  return {
    digits,
    value,
    word: convertNumberToWord(value)
  }
}

export function generatePartBQuestion(options: RandomQuestionOptions = {}): PartBQuestion {
  const rng = getRng(options.rng)
  const left = randomIntInclusive(PART_B_MIN, PART_B_MAX, rng)
  const right = randomIntInclusive(PART_B_MIN, PART_B_MAX, rng)

  const subtractionLeft = Math.max(left, right)
  const subtractionRight = Math.min(left, right)

  return {
    left,
    right,
    additionAnswer: left + right,
    subtractionLeft,
    subtractionRight,
    subtractionAnswer: subtractionLeft - subtractionRight
  }
}

