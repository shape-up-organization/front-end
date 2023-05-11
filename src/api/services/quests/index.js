import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withHeaders } from '@api/middlewares'

const route = '/quests'

const createQuest = async data =>
  tryCatch(http.post, route, data, {
    ...withHeaders(withAuth()),
  })

const getQuests = async () =>
  tryCatch(http.get, route, {
    ...withHeaders(withAuth()),
  })

export default {
  createQuest,
  getQuests,
}
