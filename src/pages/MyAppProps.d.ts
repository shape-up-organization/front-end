import { AppProps } from 'next/app'
import { EmotionCache } from '@emotion/react'

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache
}
