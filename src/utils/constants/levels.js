const LEVELS = [
  { level: 1, max: 99, min: 0 },
  { level: 2, max: 199, min: 100 },
  { level: 3, max: 299, min: 200 },
  { level: 4, max: 399, min: 300 },
  { level: 5, max: 499, min: 400 },
  { level: 6, max: 599, min: 500 },
  { level: 7, max: 699, min: 600 },
]
Object.freeze(LEVELS)

const BORDERS = {
  1: 'linear-gradient(to right, #C0C0C0 0%, #C0C0C0 100%)',
  2: 'linear-gradient(to right, #FFD700 0%, #FFD700 100%)',
  3: 'linear-gradient(to right, #23C7A8 0%, #23C7A8 100%)',
  4: 'linear-gradient(to right, #AD1F1F 0%, #AD1F1F 100%)',
  5: 'linear-gradient(to right, #0C0490 0%, #0C0490 100%)',
  6: 'linear-gradient(to right, #8E2FC8 0%, #8E2FC8 100%)',
  7: 'linear-gradient(to right, #0C0490 0%, #8E2FC8 100%)',
}
Object.freeze(BORDERS)

const CONTRAST_COLORS = {
  1: '#000',
  2: '#000',
  3: '#000',
  4: '#fff',
  5: '#fff',
  6: '#fff',
  7: '#fff',
}
Object.freeze(CONTRAST_COLORS)

const getLevel = xp => {
  if (xp < 0) return 1
  return (
    LEVELS.find(lvl => xp >= lvl.min && xp <= lvl.max)?.level ||
    LEVELS.at(-1)?.level
  )
}

const getBorder = xp => BORDERS[getLevel(xp)]

const getContrastColor = xp => CONTRAST_COLORS[getLevel(xp)]

const getProgress = xp => {
  const level = getLevel(xp)
  const { min, max } = LEVELS.find(lvl => lvl.level === level)
  return Math.round(((xp - min) / (max - min)) * 100)
}

const getNextLevel = level => LEVELS.find(lvl => lvl.level === level + 1)?.level

const getXpToNextLevel = xp => {
  const level = getLevel(xp)
  const { max } = LEVELS.find(lvl => lvl.level === level)
  return max - xp
}

export {
  getBorder,
  getContrastColor,
  getLevel,
  getNextLevel,
  getProgress,
  getXpToNextLevel,
}
