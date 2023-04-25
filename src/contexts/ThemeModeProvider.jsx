import { createContext } from 'react'

import { enUS, ptBR } from 'date-fns/locale'
import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { CssBaseline, GlobalStyles, Paper, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { useCustomTheme } from '@styles/useCustomTheme'

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
          <GlobalStyles
            styles={{
              body: { backgroundColor: theme.palette.background.body },
            }}
          />
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
