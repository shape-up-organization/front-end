const LEVELS = [
  { min: 0, max: 99, level: 1 },
  { min: 100, max: 199, level: 2 },
  { min: 200, max: 299, level: 3 },
  { min: 300, max: 399, level: 4 },
  { min: 400, max: 499, level: 5 },
  { min: 500, max: 599, level: 6 },
  { min: 600, max: 699, level: 7 },
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

const getLevel = xp =>
  LEVELS.find(lvl => xp >= lvl.min && xp <= lvl.max)?.level ||
  LEVELS[LEVELS.length - 1]?.level

const getBorder = xp => {
  const level = getLevel(xp)
  return BORDERS[level]
}

export { getLevel, getBorder }
