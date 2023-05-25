import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withHeaders } from '@api/middlewares'
import { objectToQueryString } from '@utils/helpers/server'

const routeUsers = '/users'
const routeRank = '/rank'

const getByUsername = async username =>
  tryCatch(http.get, `${routeUsers}/find-username/${username}`, {
    ...withHeaders(withAuth()),
  })

const getRankedFriends = async queryString =>
  tryCatch(
    http.get,
    `${routeRank}/friends${objectToQueryString(queryString)}`,
    {
      ...withHeaders(withAuth()),
    }
  )

const getRankedGlobal = async queryString =>
  tryCatch(http.get, `${routeRank}/global${objectToQueryString(queryString)}`, {
    ...withHeaders(withAuth()),
  })

const searchByName = async name =>
  tryCatch(http.get, `${routeUsers}/search-fullname?fullName=${name}`, {
    ...withHeaders(withAuth()),
  })

const searchByUsername = async username =>
  tryCatch(http.get, `${routeUsers}/search-username/${username}`, {
    ...withHeaders(withAuth()),
  })

export default {
  getRankedFriends,
  getRankedGlobal,
  getByUsername,
  searchByName,
  searchByUsername,
}
