import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withHeaders } from '@api/middlewares'

const route = '/posts'

const getPosts = async () =>
  tryCatch(http.get, route, {
    ...withHeaders(withAuth()),
  })

const getCommentsByPostId = async postId =>
  tryCatch(http.get, `${route}/${postId}`, {
    ...withHeaders(withAuth()),
  })

const sendComment = async (postId, comment) =>
  tryCatch(http.post, `${route}/${postId}`, comment, {
    ...withHeaders(withAuth()),
  })

export default {
  getCommentsByPostId,
  getPosts,
  sendComment,
}
