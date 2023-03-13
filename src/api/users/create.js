import { http } from '@api/lib/http'

export const create = async payload => http.post('/users', payload)
