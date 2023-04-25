import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth } from '@api/middlewares/withAuth'
import { withHeaders } from '@api/middlewares/withHeaders'

const route = '/users'

const deleteAccount = async () =>
  tryCatch(http.delete, route, withHeaders(withAuth()))

const updateUserData = async updatedData =>
  tryCatch(http.put, route, updatedData, withHeaders(withAuth()))

export default {
  deleteAccount,
  updateUserData,
}
