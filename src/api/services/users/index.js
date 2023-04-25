import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth } from '@api/middlewares/withAuth'
import { withHeaders } from '@api/middlewares/withHeaders'

const route = '/users'

const searchByName = async params =>
  tryCatch(http.get, `${route + params}`, withHeaders(withAuth()))

const searchByUsername = async username =>
  tryCatch(
    http.get,
    `${route}/search-username/${username}`,
    withHeaders(withAuth())
  )

export default {
  searchByName,
  searchByUsername,
}
