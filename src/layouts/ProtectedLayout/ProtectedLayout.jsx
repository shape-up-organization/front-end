import { useEffect, useState } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

import { Grid, Stack, useMediaQuery } from '@mui/material'

import { Navbar } from '@organisms/Navbar'
import { LoadingPage } from '@pages/LoadingPage'

import { useAuth, useChat } from '@contexts'
import { useScrollDirection } from '@hooks'

const ProtectedLayout = () => {
  const location = useLocation()
  const lessThanExtraLarge = useMediaQuery(theme =>
    theme.breakpoints.down('xl')
  )
  const { getUserData, isTokenInvalid, signOut } = useAuth()
  const {
    chatsData,
    loadData,
    setUserData,
    userData,
    updateUserData,
    updateXp,
  } = useChat()
  const [scrollDirection, currentScrollRef, forceScrollDirection] =
    useScrollDirection()

  const [isLoading, setIsLoading] = useState(true)

  const verifyAuth = async () => {
    const isInvalid = await isTokenInvalid()
    if (isInvalid) {
      setUserData({ connected: false })
      signOut()
      setIsLoading(false)
      return
    }

    if (!userData.username) {
      const nextUserData = await getUserData()
      loadData(nextUserData)
    } else if (!userData.connected) updateUserData({ connected: true })

    await updateXp()

    setIsLoading(false)
  }

  const scrollToTop = () => {
    if (currentScrollRef.current) {
      currentScrollRef.current.scrollTop = 0
    }
  }

  useEffect(() => {
    verifyAuth()
    scrollToTop()
  }, [location])

  return isLoading && chatsData.deprecated ? (
    <LoadingPage />
  ) : (
    <Grid container overflow="hidden" height="100%">
      <Grid
        item
        xs={12}
        sx={{
          height: theme =>
            theme.spacing(
              lessThanExtraLarge && scrollDirection === 'down' ? 0 : 11
            ),
          transition: theme =>
            theme.transitions.create('height', {
              duration: theme.transitions.duration.standard,
            }),
        }}
      >
        <Navbar scrollDirection={scrollDirection} />
      </Grid>
      <Grid
        item
        xs={12}
        overflow="hidden"
        sx={{
          height: theme =>
            `calc(100vh - ${theme.spacing(
              lessThanExtraLarge && scrollDirection === 'down' ? 4 : 11
            )})`,
          pt: lessThanExtraLarge ? 0 : 3,
          transition: theme =>
            theme.transitions.create(['height', 'padding-top'], {
              duration: theme.transitions.duration.standard,
            }),
        }}
      >
        <Grid
          container
          justifyContent="center"
          height="100%"
          overflow="hidden"
          pb={1}
          px={{ xs: 0, sm: 8, md: 10, lg: 16 }}
        >
          <Stack
            height="100%"
            minWidth={320}
            overflow="auto"
            ref={currentScrollRef}
            width="100%"
          >
            <Outlet context={[currentScrollRef, forceScrollDirection]} />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { ProtectedLayout }
