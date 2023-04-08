import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// translation files
import translationEn from './locales/en/translation.json'
import translationPt from './locales/pt/translation.json'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    resources: {
      en: {
        translation: translationEn,
      },
      pt: {
        translation: translationPt,
      },
    },
  })

export default i18n
