import { useContext } from 'react'
import Head from 'next/head'

import { Switch, Typography, useTheme } from '@mui/material'

import { ThemeContext, type ThemeContextType } from '@contexts'
import { styled } from '@mui/material/styles'

const StyledSwitch = styled(Switch)(({ theme = useTheme() }) => ({
  backgroundColor: theme.palette.primary.main,
}))

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
        <StyledSwitch checked={isDark} onChange={() => setIsDark(!isDark)} color="error" />
      </main>
    </>
  )
}
