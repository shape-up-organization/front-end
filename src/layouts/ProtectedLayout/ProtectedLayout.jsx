import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import { useAuth, useChat } from '@contexts'
import { LoadingPage } from '@pages/LoadingPage'

const ProtectedLayout = () => {
  const { extractUsername, isTokenInvalid, signOut } = useAuth()
  const { updateUsername } = useChat()
  const [isLoading, setIsLoading] = useState(true)

  const verifyAuth = async () => {
    const isInvalid = await isTokenInvalid()
    if (isInvalid) {
      signOut()
      setIsLoading(false)
      return
    }

    const username = await extractUsername()
    await updateUsername(username)

    setIsLoading(false)
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  return isLoading ? <LoadingPage /> : <Outlet />
}

export { ProtectedLayout }
