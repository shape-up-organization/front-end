const normalize = string =>
  string
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f\s]/g, '')
    .toLowerCase()
    .trim()

export { normalize }
