export const PART_A_MIN = 100
export const PART_A_MAX = 999
export const PART_B_MIN = 1
export const PART_B_MAX = 19

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type PartATriple = [hundreds: number, tens: Digit, ones: Digit]

export interface PartAQuestion {
  digits: PartATriple
  value: number
  word: string
}

export interface PartBQuestion {
  left: number
  right: number
  additionAnswer: number
  subtractionLeft: number
  subtractionRight: number
  subtractionAnswer: number
}

export interface RandomQuestionOptions {
  rng?: () => number
}

