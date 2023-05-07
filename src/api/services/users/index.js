import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withHeaders } from '@api/middlewares'

const route = '/users'

const getByUsername = async username =>
  tryCatch(http.get, `${route}/find-username/${username}`, {
    ...withHeaders(withAuth()),
  })

const searchByName = async name =>
  tryCatch(http.get, `${route}/search-fullname?name=${name}`, {
    ...withHeaders(withAuth()),
  })

const searchByUsername = async username =>
  tryCatch(http.get, `${route}/search-username/${username}`, {
    ...withHeaders(withAuth()),
  })

export default {
  getByUsername,
  searchByName,
  searchByUsername,
}
