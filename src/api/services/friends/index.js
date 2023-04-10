import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

const acceptFriendshipRequest = async (jwtToken, username) =>
  http.post(`/friends/accept-friendship-request/${username}`, null, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })

const getAllFriendship = async jwtToken =>
  tryCatch(http.get, '/friends/get-all-friendship', {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })

const sendFriendshipRequest = async (jwtToken, username) =>
  http.post(`/friends/sent-friendship-request/${username}`, null, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })

export default {
  acceptFriendshipRequest,
  getAllFriendship,
  sendFriendshipRequest,
}
