import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withHeaders } from '@api/middlewares'

const route = '/squads'

const getSquadDetails = async squadId =>
  tryCatch(http.get, `${route}/${squadId}`, {
    ...withHeaders(withAuth()),
  })

const promoteUser = async (squadId, userId) =>
  tryCatch(http.put, `${route}/${squadId}/promote/${userId}`, {
    ...withHeaders(withAuth()),
  })

const removeUserAdmin = async (squadId, userId) =>
  tryCatch(http.put, `${route}/${squadId}/remove-admin/${userId}`, {
    ...withHeaders(withAuth()),
  })

const removeUser = async (squadId, userId) =>
  tryCatch(http.delete, `${route}/${squadId}/remove/${userId}`, {
    ...withHeaders(withAuth()),
  })

export default {
  getSquadDetails,
  promoteUser,
  removeUser,
  removeUserAdmin,
}
