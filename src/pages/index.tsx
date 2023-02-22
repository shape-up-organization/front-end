import { useContext } from 'react'
import Head from 'next/head'

import { Switch, Typography } from '@mui/material'

import { ThemeContext, type ThemeContextType } from '@contexts'

export default function Home() {
  const { isDark, setIsDark } = useContext(ThemeContext) as ThemeContextType

  return (
    <>
      <Head>
        <title>ShapeUp</title>
        <meta name="Index Page" content="ShapeUp landing page" />
      </Head>
      <main>
        <Typography variant="h6">{process.env.NEXT_PUBLIC_TEST_ENV}</Typography>
        <Switch checked={isDark} onChange={() => setIsDark(!isDark)} />
      </main>
    </>
  )
}
