import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withFileHeaders, withHeaders } from '@api/middlewares'

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

const createPostWithoutPhoto = async post =>
  tryCatch(http.post, `${postRoute}/without-photo`, post, {
    ...withHeaders(withAuth()),
  })

const deletePost = async postId =>
  tryCatch(http.delete, `${postRoute}/${postId}`, {
    ...withHeaders(withAuth()),
  })

const getPosts = async () =>
  tryCatch(http.get, `${postRoute}?page=0&size=10`, {
    ...withHeaders(withAuth()),
  })

const getPostsByUsername = async username =>
  tryCatch(http.get, `${postRoute}/username/${username}?page=0&size=10`, {
    ...withHeaders(withAuth()),
  })

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
  createPostWithoutPhoto,
  deletePost,
  getCommentsByPostId,
  getPosts,
  getPostsByUsername,
  sendComment,
  toggleLikePost,
}
