const CHINESE_DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] as const

export function numberToChineseNumerals(value: number): string {
  if (!Number.isInteger(value) || value < 0 || value > 100) {
    throw new RangeError(`Cannot convert ${value} to Chinese numerals`)
  }

  if (value < 10) {
    return CHINESE_DIGITS[value]
  }

  if (value === 10) {
    return '十'
  }

  if (value === 100) {
    return '一百'
  }

  const tens = Math.floor(value / 10)
  const ones = value % 10
  const tensPrefix = tens === 1 ? '十' : `${CHINESE_DIGITS[tens]}十`

  return ones === 0 ? tensPrefix : `${tensPrefix}${CHINESE_DIGITS[ones]}`
}

export function factorToChineseLabel(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 10) {
    throw new RangeError(`Cannot label multiplication factor ${value}`)
  }

  return numberToChineseNumerals(value)
}
