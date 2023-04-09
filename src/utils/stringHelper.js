const normalize = string =>
  string
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f\s]/g, '')
    .toLowerCase()
    .trim()

const charactersToLineBreaks = string => string?.replace(/\\n/gm, '\r\n')

const lineBreaksToCharacters = string =>
  string?.replace(/(\r\n|\n|\r)/gm, '\\n')

export { normalize, charactersToLineBreaks, lineBreaksToCharacters }
