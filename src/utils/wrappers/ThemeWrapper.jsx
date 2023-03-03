import { CssBaseline, Paper, ThemeProvider } from '@mui/material'

import { ThemeModeContext } from '@contexts'
import { useCustomTheme } from '@styles/useCustomTheme'

const ThemeWrapper = ({ children }) => {
  const { theme, colorMode } = useCustomTheme()

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper>
          <CssBaseline />
          {children}
        </Paper>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export { ThemeWrapper }
