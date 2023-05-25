const DATES = {
  en: 'yyyy/MM/dd',
  pt: 'dd/MM/yyyy',
}
Object.freeze(DATES)

const PHONES = {
  en: '+1 (999) 999-9999',
  pt: '+55 (99) 99999-9999',
}
Object.freeze(PHONES)

const ZIP_CODES = {
  pt: '99999-999',
}
Object.freeze(ZIP_CODES)

export const masks = { DATES, PHONES, ZIP_CODES }
