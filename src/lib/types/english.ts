export interface Shape2D {
  id: string
  name: string
  emoji: string
}

export interface Shape3D {
  id: string
  name: string
  emoji: string
}

export interface DayOrMonth {
  id: string
  name: string
}

export const SHAPES_2D: Shape2D[] = [
  { id: 'circle', name: 'Circle', emoji: '⭕' },
  { id: 'square', name: 'Square', emoji: '⬛' },
  { id: 'triangle', name: 'Triangle', emoji: '🔺' },
  { id: 'rectangle', name: 'Rectangle', emoji: '▭' },
  { id: 'pentagon', name: 'Pentagon', emoji: '⬠' },
  { id: 'hexagon', name: 'Hexagon', emoji: '⬡' },
  { id: 'star', name: 'Star', emoji: '⭐' },
  { id: 'heart', name: 'Heart', emoji: '❤️' }
]

export const SHAPES_3D: Shape3D[] = [
  { id: 'cube', name: 'Cube', emoji: '🎲' },
  { id: 'sphere', name: 'Sphere', emoji: '🔵' },
  { id: 'cylinder', name: 'Cylinder', emoji: '🔊' },
  { id: 'cone', name: 'Cone', emoji: '🍦' },
  { id: 'pyramid', name: 'Pyramid', emoji: '🔺' }
]

export const DAYS_OF_WEEK: DayOrMonth[] = [
  { id: 'monday', name: 'Monday' },
  { id: 'tuesday', name: 'Tuesday' },
  { id: 'wednesday', name: 'Wednesday' },
  { id: 'thursday', name: 'Thursday' },
  { id: 'friday', name: 'Friday' },
  { id: 'saturday', name: 'Saturday' },
  { id: 'sunday', name: 'Sunday' }
]

export const MONTHS_OF_YEAR: DayOrMonth[] = [
  { id: 'january', name: 'January' },
  { id: 'february', name: 'February' },
  { id: 'march', name: 'March' },
  { id: 'april', name: 'April' },
  { id: 'may', name: 'May' },
  { id: 'june', name: 'June' },
  { id: 'july', name: 'July' },
  { id: 'august', name: 'August' },
  { id: 'september', name: 'September' },
  { id: 'october', name: 'October' },
  { id: 'november', name: 'November' },
  { id: 'december', name: 'December' }
]
