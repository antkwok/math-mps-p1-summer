export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export interface ChecklistState {
  items: ChecklistItem[]
}

export const DEFAULT_CHECKLIST_ITEMS = [
  { id: 'spell-numbers', text: 'I can spell number words 1-999.' },
  { id: 'spell-2d-shapes', text: 'I can spell names of 2D Shapes.' },
  { id: 'spell-3d-shapes', text: 'I can spell names of 3D Shapes.' },
  { id: 'spell-time', text: 'I can spell 7 days in a week & 12 months in a year.' },
  { id: 'addition-subtraction', text: 'I can do addition and subtraction quickly and accurately.' },
  { id: 'counting-groups', text: 'I can perform the counting in groups of 20, 25, 50 & 100.' },
  { id: 'multiplication', text: 'I can recite the multiplication tables 1-10 / 九因歌.' }
] as const
