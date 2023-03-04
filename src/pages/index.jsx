import { useContext } from 'react'
import Head from 'next/head'

import { Switch, Typography, useTheme } from '@mui/material'

import { ThemeModeContext } from '@contexts'
import { styled } from '@mui/material/styles'
import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'
import { Box } from '@mui/system'
import { Principal } from '@/components/Principal'

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
        <Principal />
      </main>
    </>
  )
}
