import { useEffect, useState } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

import { useAuth, useChat } from '@contexts'
import { LoadingPage } from '@pages/LoadingPage'

const ProtectedLayout = () => {
  const { getUserData, isTokenInvalid, signOut } = useAuth()
  const { chatsData, loadData, updateOnline, userData } = useChat()

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

  return isLoading && chatsData.deprecated ? <LoadingPage /> : <Outlet />
}

export { ProtectedLayout }
