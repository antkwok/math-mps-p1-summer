import { PART_A_MAX, PART_A_MIN } from '../types/practice'

const ONE_TO_NINETEEN = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen'
] as const

const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'] as const

export function convertNumberToWord(num: number): string {
  if (!Number.isInteger(num)) {
    throw new Error('convertNumberToWord only accepts an integer value.')
  }

  if (num < PART_A_MIN || num > PART_A_MAX) {
    throw new RangeError(`Number must be between ${PART_A_MIN} and ${PART_A_MAX}.`)
  }

  const hundreds = Math.floor(num / 100)
  const remainder = num % 100

  let result = `${ONE_TO_NINETEEN[hundreds]} hundred`

  if (remainder === 0) {
    return result
  }

  if (remainder < 20) {
    return `${result} and ${ONE_TO_NINETEEN[remainder]}`
  }

  const tens = Math.floor(remainder / 10)
  const ones = remainder % 10
  result = `${result} and ${TENS[tens]}`

  if (ones > 0) {
    result += `-${ONE_TO_NINETEEN[ones]}`
  }

  return result
}

