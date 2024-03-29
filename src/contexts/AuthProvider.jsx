import { createContext, useContext, useMemo } from 'react'

import P from 'prop-types'

import { Buffer } from 'buffer'
import { Cookies, useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [, setCookie, removeCookie] = useCookies(['jwt-token'])
  const cookies = new Cookies()
  const navigate = useNavigate()

  const parseJwt = unparsedToken => {
    if (!unparsedToken) return null
    const base64Payload = unparsedToken.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const signIn = async newJwtToken => {
    setCookie('jwt-token', newJwtToken, {
      path: '/',
    })

    navigate('/feed')
  }

  const signOut = () => {
    removeCookie('jwt-token')
    navigate('/', { replace: true })
  }

  const getJwtToken = () => {
    const jwtToken = cookies.get('jwt-token')
    if (jwtToken === undefined || jwtToken === null) {
      return null
    }
    return jwtToken
  }

  const isTokenInvalid = () => {
    const jwtToken = getJwtToken()
    if (jwtToken) {
      const parsedJwtToken = parseJwt(jwtToken)
      if (parsedJwtToken === null || parsedJwtToken.exp < Date.now() / 1000) {
        return true
      }
      return false
    }
    return true
  }

  const updateJwtToken = async newJwtToken => {
    setCookie('jwt-token', newJwtToken, {
      path: '/',
    })
  }

  const getTokenProp = prop => parseJwt(getJwtToken())[prop]

  const getUserData = () => ({
    biography: getTokenProp('biography') || '',
    email: getTokenProp('email'),
    name: getTokenProp('name'),
    id: getTokenProp('id'),
    jwtToken: getJwtToken(),
    fullName: getTokenProp('fullName'),
    lastName: getTokenProp('lastName'),
    profilePicture: getTokenProp('profilePicture'),
    username: getTokenProp('username'),
    xp: Number(getTokenProp('xp')),
  })

  // TODO: Validate with Back-end to revalidate or not here
  // const revalidateToken = async () => {
  //   const jwtToken = await getJwtToken()
  //   jwtToken.exp = Date.now() / 1000 + 60 * 60 * 1 // 1 hour
  //   setCookie('jwt-token', jwtToken, {
  //     path: '/',
  //   })
  // }

  const auth = useMemo(
    () => ({
      getJwtToken,
      getTokenProp,
      getUserData,
      isTokenInvalid,
      signIn,
      signOut,
      updateJwtToken,
    }),
    []
  )

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: P.node.isRequired,
}

export const useAuth = () => useContext(AuthContext)
