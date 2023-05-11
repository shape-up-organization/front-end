import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withFileHeaders, withHeaders } from '@api/middlewares'

const routeProfiles = '/profiles'
const routeUsers = '/users'

const uploadProfilePicture = async picture =>
  tryCatch(http.post, `${routeProfiles}/picture`, picture, {
    ...withHeaders({ ...withAuth(), ...withFileHeaders() }),
  })

const deleteAccount = async () =>
  tryCatch(http.delete, routeUsers, { ...withHeaders(withAuth()) })

const removeProfilePicture = async () =>
  tryCatch(http.delete, `${routeProfiles}/picture`, {
    ...withHeaders(withAuth()),
  })

const updateUserData = async updatedData =>
  tryCatch(http.put, routeUsers, updatedData, { ...withHeaders(withAuth()) })

export default {
  deleteAccount,
  removeProfilePicture,
  updateUserData,
  uploadProfilePicture,
}
