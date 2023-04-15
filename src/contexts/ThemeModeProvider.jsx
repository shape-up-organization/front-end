import P from 'prop-types'
import { createContext } from 'react'

import { CssBaseline, Paper, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enUS, ptBR } from 'date-fns/locale'

import { useCustomTheme } from '@styles/useCustomTheme'
import { useTranslation } from 'react-i18next'

export const ThemeModeContext = createContext({ toggleColorMode: () => {} })

const locales = {
  en: enUS,
  pt: ptBR,
}

export const ThemeModeProvider = ({ children }) => {
  const { theme, colorMode } = useCustomTheme()
  const { i18n } = useTranslation()

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper sx={{ bgcolor: 'background.default' }}>
          <CssBaseline />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locales[i18n.resolvedLanguage]}
          >
            {children}
          </LocalizationProvider>
        </Paper>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

ThemeModeProvider.propTypes = {
  children: P.element.isRequired,
}
