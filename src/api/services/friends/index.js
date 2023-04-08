import { http } from '@api/lib/http'

const acceptFriendshipRequest = async (jwtToken, username) =>
  http.post(`/friends/accept-friendship-request/${username}`, null, {
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

export default { acceptFriendshipRequest, sendFriendshipRequest }
