import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

const markOffline = async userId =>
  tryCatch(http.post, `/presence/mark-offline/${userId}`)

const markOnline = async userId =>
  tryCatch(http.post, `/presence/mark-online/${userId}`)

export default {
  markOffline,
  markOnline,
}
