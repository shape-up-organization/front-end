import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import { LoadingPage } from '@components/LoadingPage'
import { useAuth } from '@contexts'

const ProtectedLayout = () => {
  const { isTokenInvalid, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  const verifyAuth = async () => {
    if (await isTokenInvalid()) {
      signOut()
    }
    setIsLoading(false)
  }

  useEffect(() => {
    verifyAuth()
  })

  return isLoading ? <LoadingPage /> : <Outlet />
}

export { ProtectedLayout }
