import P from 'prop-types'
import { createContext, useContext, useMemo } from 'react'

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [, setCookie, removeCookie] = useCookies(['jwt-token'])
  const navigate = useNavigate()

  const signIn = jwtToken => {
    setCookie('jwt-token', jwtToken, {
      path: '/',
    })
    navigate('logged')
  }

  const signOut = () => {
    removeCookie('jwt-token')
    navigate('/', { replace: true })
  }

  const auth = useMemo(
    () => ({
      signIn,
      signOut,
    }),
    []
  )
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = { children: P.node.isRequired }

export const useAuth = () => useContext(AuthContext)
