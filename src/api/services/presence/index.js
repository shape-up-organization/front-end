import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

const route = '/presence'

const markOffline = async userId =>
  tryCatch(http.post, `${route}/mark-offline/${userId}`)

const markOnline = async userId =>
  tryCatch(http.post, `${route}/mark-online/${userId}`)

export default {
  markOffline,
  markOnline,
}
