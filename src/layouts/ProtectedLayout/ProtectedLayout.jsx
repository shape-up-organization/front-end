import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import { useAuth, useChat } from '@contexts'
import { LoadingPage } from '@pages/LoadingPage'

const ProtectedLayout = () => {
  const { getUserData, isTokenInvalid, signOut } = useAuth()
  const { chatsData, loadData, userData } = useChat()

  const [isLoading, setIsLoading] = useState(true)

  const verifyAuth = async () => {
    const isInvalid = await isTokenInvalid()
    if (isInvalid) {
      signOut()
      setIsLoading(false)
    }

    if (!userData.connected) {
      const nextUserData = await getUserData()
      loadData(nextUserData)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  return isLoading && chatsData.deprecated ? <LoadingPage /> : <Outlet />
}

export { ProtectedLayout }
