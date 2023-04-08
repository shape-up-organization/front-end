import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import { useAuth } from '@contexts'
import { LoadingPage } from '@pages/LoadingPage'

const ProtectedLayout = () => {
  const { isTokenInvalid, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  const verifyAuth = async () => {
    const isInvalid = await isTokenInvalid()
    if (isInvalid) {
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
