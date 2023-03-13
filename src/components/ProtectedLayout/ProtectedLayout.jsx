import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@contexts'
import { Buffer } from 'buffer'

const ProtectedLayout = () => {
  const { signOut } = useAuth()
  const jwtToken = useCookies(['jwt-token'])[0]['jwt-token']

  if (!jwtToken || jwtToken === 'undefined' || jwtToken === 'null') {
    signOut()
    return <Navigate to="/" />
  }

  const parseJwt = token => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  if (parseJwt(jwtToken).exp < Date.now() / 1000) {
    signOut()
  }

  return <Outlet />
}

export { ProtectedLayout }
