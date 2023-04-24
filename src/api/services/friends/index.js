import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth } from '@api/middlewares/withAuth'
import { withHeaders } from '@api/middlewares/withHeaders'

const route = '/friends'

const acceptFriendshipRequest = async username =>
  tryCatch(
    http.post,
    `${route}/accept-friendship-request/${username}`,
    null,
    withHeaders(withAuth())
  )

const getAllFriendship = async () =>
  tryCatch(http.get, `${route}/get-all-friendship`, withHeaders(withAuth()))

const sendFriendshipRequest = async username =>
  tryCatch(
    http.post,
    `${route}/sent-friendship-request/${username}`,
    null,
    withHeaders(withAuth())
  )

export default {
  acceptFriendshipRequest,
  getAllFriendship,
  sendFriendshipRequest,
}
