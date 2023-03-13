import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@contexts'

const ProtectedLayout = () => {
  const { signOut } = useAuth()
  const token = useCookies(['jwt-token'])[0]['jwt-token']

  if (!token || token === 'undefined' || token === 'null') {
    signOut()
    return <Navigate to="/" />
  }

  return <Outlet />
}

export { ProtectedLayout }
