import P from 'prop-types'

import { CssBaseline, Paper, ThemeProvider } from '@mui/material'

import { ThemeModeContext } from '@contexts'
import { useCustomTheme } from '@styles/useCustomTheme'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const ThemeWrapper = ({ children }) => {
  const { theme, colorMode } = useCustomTheme()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Paper>
            <CssBaseline />
            {children}
          </Paper>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </LocalizationProvider>
  )
}

ThemeWrapper.propTypes = {
  children: P.element,
}

export { ThemeWrapper }
