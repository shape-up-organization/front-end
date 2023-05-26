import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withFileHeaders, withHeaders } from '@api/middlewares'
import { objectToQueryString } from '@utils/helpers/server'

const postRoute = '/posts'
const commentRoute = '/comments'

const createComment = async comment =>
  tryCatch(http.post, commentRoute, comment, {
    ...withHeaders(withAuth()),
  })

const createPost = async post =>
  tryCatch(http.post, postRoute, post, {
    ...withHeaders({ ...withAuth(), ...withFileHeaders() }),
  })

const createPostFromFile = async file =>
  tryCatch(http.post, `${postRoute}/read-txt`, file, {
    ...withHeaders({ ...withAuth(), ...withFileHeaders() }),
  })

const createPostWithoutPhoto = async post =>
  tryCatch(http.post, `${postRoute}/without-photo`, post, {
    ...withHeaders(withAuth()),
  })

const deletePost = async postId =>
  tryCatch(http.delete, `${postRoute}/${postId}`, {
    ...withHeaders(withAuth()),
  })

const generateTxt = async postId =>
  tryCatch(http.get, `${postRoute}/generate-txt/${postId}`, {
    ...withHeaders(withAuth()),
  })

const getPosts = async queryParams =>
  tryCatch(http.get, `${postRoute}${objectToQueryString(queryParams)}`, {
    ...withHeaders(withAuth()),
  })

const getPostsByUsername = async (username, queryParams) =>
  tryCatch(
    http.get,
    `${postRoute}/username/${username}${objectToQueryString(queryParams)}`,
    {
      ...withHeaders(withAuth()),
    }
  )

const getCommentsByPostId = async postId =>
  tryCatch(http.get, `${commentRoute}/post/${postId}?page=0&size=10`, {
    ...withHeaders(withAuth()),
  })

const sendComment = async payload =>
  tryCatch(http.post, commentRoute, payload, {
    ...withHeaders(withAuth()),
  })

const toggleLikePost = async postId =>
  tryCatch(http.post, `${postRoute}/${postId}/like`, null, {
    ...withHeaders(withAuth()),
  })

export default {
  createComment,
  createPost,
  createPostFromFile,
  createPostWithoutPhoto,
  deletePost,
  generateTxt,
  getCommentsByPostId,
  getPosts,
  getPostsByUsername,
  sendComment,
  toggleLikePost,
}
