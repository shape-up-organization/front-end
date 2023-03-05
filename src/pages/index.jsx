import Head from 'next/head'
import { useContext, useState } from 'react'

import { Switch, Typography, useTheme } from '@mui/material'

import { Header } from '@components/Header'
import { LoginModal } from '@components/LoginModal'
import { ThemeModeContext } from '@contexts'
import { styled } from '@mui/material/styles'

const StyledSwitch = styled(Switch)(({ theme = useTheme() }) => ({
  backgroundColor: theme.palette.primary.main,
}))

export default function Home() {
  const theme = useTheme()
  const colorMode = useContext(ThemeModeContext)

  const [loginOpen, setLoginOpen] = useState(true)

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
        <button onClick={() => setLoginOpen(true)}>aperta</button>
        <LoginModal
          open={loginOpen}
          handleClose={() => setLoginOpen(prevLoginOpen => !prevLoginOpen)}
        />
      </main>
    </>
  )
}
