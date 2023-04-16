import { useEffect, useState } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

import { Grid, useMediaQuery } from '@mui/material'

import { Navbar } from '@organisms/Navbar'
import { LoadingPage } from '@pages/LoadingPage'

import { useAuth, useChat } from '@contexts'

const ProtectedLayout = () => {
  const { getUserData, isTokenInvalid, signOut } = useAuth()
  const { chatsData, loadData, updateOnline, userData } = useChat()
  const lessThanLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [isLoading, setIsLoading] = useState(true)

  const verifyAuth = async () => {
    const isInvalid = await isTokenInvalid()
    if (isInvalid) {
      updateOnline(false)
      signOut()
      setIsLoading(false)
      return
    }

    if (!userData.username) {
      const nextUserData = await getUserData()
      loadData(nextUserData)
    }

    if (!userData.connected && !chatsData.deprecated) updateOnline(true)

    setIsLoading(false)
  }

  const location = useLocation()

  useEffect(() => {
    verifyAuth()
  }, [location])

  return isLoading && chatsData.deprecated ? (
    <LoadingPage />
  ) : (
    <Grid container>
      <Grid item xs={12} sx={{ height: theme => theme.spacing(11) }}>
        <Navbar />
      </Grid>
      <Grid
        item
        xs={12}
        height={theme => `calc(100vh - ${theme.spacing(11)})`}
        overflow="hidden"
        pt={lessThanLarge ? 0 : 7}
      >
        <Outlet />
      </Grid>
    </Grid>
  )
}

export { ProtectedLayout }
