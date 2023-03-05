import Head from 'next/head'

import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '@styles/createEmotionCache'

import { ThemeWrapper } from '@utils/wrappers/ThemeWrapper'

const clientSideEmotionCache = createEmotionCache()

import '../styles/globals.css'

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </CacheProvider>
  )
}
