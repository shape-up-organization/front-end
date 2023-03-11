import P from 'prop-types'
import { createContext } from 'react'

import { CssBaseline, Paper, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { useCustomTheme } from '@styles/useCustomTheme'

export const ThemeModeContext = createContext({ toggleColorMode: () => {} })

export const ThemeModeProvider = ({ children }) => {
  const { theme, colorMode } = useCustomTheme()

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {children}
          </LocalizationProvider>
        </Paper>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

ThemeModeProvider.propTypes = {
  children: P.element,
}
