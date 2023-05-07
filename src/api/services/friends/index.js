import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withHeaders } from '@api/middlewares'

const route = '/friends'

const deleteFriend = async username =>
  tryCatch(http.delete, `${route}/delete-friend/${username}`, {
    ...withHeaders(withAuth()),
  })

const acceptFriendshipRequest = async username =>
  tryCatch(http.post, `${route}/accept-friendship-request/${username}`, null, {
    ...withHeaders(withAuth()),
  })

const deleteFriendshipRequest = async username =>
  tryCatch(http.delete, `${route}/delete-friendship-request/${username}`, {
    ...withHeaders(withAuth()),
  })

const getAllFriendship = async () =>
  tryCatch(http.get, `${route}/get-all-friendship`, {
    ...withHeaders(withAuth()),
  })

const sendFriendshipRequest = async username =>
  tryCatch(
    http.post,
    `${route}/sent-friendship-request/${username}`,
    null,
    withHeaders(withAuth())
  )

export default {
  acceptFriendshipRequest,
  deleteFriend,
  deleteFriendshipRequest,
  getAllFriendship,
  sendFriendshipRequest,
}
