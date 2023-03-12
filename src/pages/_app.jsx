import Head from 'next/head'
import P from 'prop-types'

import { CacheProvider } from '@emotion/react'
import { createEmotionCache } from '@styles/createEmotionCache'

import { ThemeModeProvider } from '@contexts'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeModeProvider>
        <Component {...pageProps} />
      </ThemeModeProvider>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: P.func.isRequired,
  emotionCache: P.object,
  pageProps: P.object.isRequired,
}

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
}
