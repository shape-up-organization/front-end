import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withHeaders } from '@api/middlewares'
import axios from 'axios'

const route = '/quests'

const addQuest = async data =>
  tryCatch(http.post, `${route}/user/add-training`, data, {
    ...withHeaders(withAuth()),
  })

const checkQuest = async data =>
  tryCatch(http.put, `${route}/user/finish-training`, data, {
    ...withHeaders(withAuth()),
  })

const deleteQuest = async data =>
  tryCatch(http.delete, `${route}/user/remove-training`, data, {
    ...withHeaders(withAuth()),
  })

const editQuest = async data =>
  tryCatch(http.put, `${route}/user/periodic-training-update`, data, {
    ...withHeaders(withAuth()),
  })

const getQuests = async () =>
  tryCatch(http.get, `${route}/user/trainings`, {
    ...withHeaders(withAuth()),
  })

const getPacks = async () =>
  tryCatch(axios.get, `http://107.20.108.49:7000/trainings`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

export default {
  addQuest,
  checkQuest,
  deleteQuest,
  editQuest,
  getQuests,
  getPacks,
}
