import { http } from '@api/lib/http'

const create = async payload => http.post('/users', payload)
const authenticate = async payload => http.post('/users/auth', payload)

export const users = { create, authenticate }
