import { useContext } from 'react'
import Head from 'next/head'

import { Switch, Typography, useTheme } from '@mui/material'

import { ThemeModeContext } from '@contexts'
import { styled } from '@mui/material/styles'
import { Header } from '@/components/Header'

const StyledSwitch = styled(Switch)(({ theme = useTheme() }) => ({
  backgroundColor: theme.palette.primary.main,
}))

export default function Home() {
  const theme = useTheme()
  const colorMode = useContext(ThemeModeContext)

  return (
    <>
      <Head>
        <title>ShapeUp</title>
        <meta name="Index Page" content="ShapeUp landing page" />
      </Head>
      <main>
        <Typography variant="h6">{process.env.NEXT_PUBLIC_DOCKER}</Typography>
        <Typography variant="h6">{process.env.NEXT_PUBLIC_LOCAL}</Typography>
        <StyledSwitch
          checked={theme.palette.mode === 'dark'}
          onChange={colorMode.toggleColorMode}
          color="error"
        />
        <Header />
      </main>
    </>
  )
}
