import { useMemo, useState } from 'react'
import { createTheme, PaletteMode } from '@mui/material'
import { getDesignTokens } from '@/styles/theme'

export const useCustomTheme = () => {
  const [mode, setMode] = useState<PaletteMode>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return { theme, colorMode }
}
