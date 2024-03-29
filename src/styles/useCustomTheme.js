import { useEffect, useMemo, useState } from 'react'

import { createTheme } from '@mui/material'

import { getDesignTokens } from '@styles/theme'

export const useCustomTheme = () => {
  const [mode, setMode] = useState('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  useEffect(() => {
    if (
      window &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setMode('dark')
    }
  }, [])

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return { theme, colorMode, setMode }
}
