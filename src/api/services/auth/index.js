import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

const login = async payload => tryCatch(http.post, '/auth/login', payload)

const register = async payload => tryCatch(http.post, '/auth/register', payload)

const validateUsername = async username =>
  tryCatch(http.get, `/auth/validate-username/${username}`)

export default { login, register, validateUsername }
