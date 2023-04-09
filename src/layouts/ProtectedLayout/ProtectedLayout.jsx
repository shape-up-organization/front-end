import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import { useAuth, useChat } from '@contexts'
import { LoadingPage } from '@pages/LoadingPage'

const ProtectedLayout = () => {
  const { getUserData, isTokenInvalid, signOut } = useAuth()
  const { chatsData, loadData, updateUserData, userData } = useChat()

  const [isLoading, setIsLoading] = useState(true)

  const verifyAuth = async () => {
    const isInvalid = await isTokenInvalid()
    if (isInvalid) {
      signOut()
      setIsLoading(false)
    }

    getChatsData()
  }

  const getChatsData = async () => {
    if (!userData.connected) {
      const data = await getUserData()
      await updateUserData(data)
    }
    if (chatsData.deprecated) loadData()
    setIsLoading(false)
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  return isLoading ? <LoadingPage /> : <Outlet />
}

export { ProtectedLayout }
