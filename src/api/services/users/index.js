import { http } from '@api/lib/http'

const create = async payload => http.post('/auth/register', payload)
const authenticate = async payload => http.post('/auth/login', payload)

export const users = { create, authenticate }
