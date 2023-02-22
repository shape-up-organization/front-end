import { useState, useEffect } from 'react'
import Head from 'next/head'

import { Paper } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, Theme } from '@mui/material/styles'

import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '@utils/styles/createEmotionCache'

import { theme } from '@styles/theme'

import { ThemeContext } from '@contexts'

import { MyAppProps } from './types'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const [isDark, setIsDark] = useState<boolean>(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme.light)

  useEffect(() => {
    setCurrentTheme({ ...(isDark ? theme.dark : theme.light) })
  }, [isDark])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={currentTheme}>
        <Paper>
          <CssBaseline />
          <ThemeContext.Provider value={{ isDark, setIsDark }}>
            <Component {...pageProps} />
          </ThemeContext.Provider>
        </Paper>
      </ThemeProvider>
    </CacheProvider>
  )
}
