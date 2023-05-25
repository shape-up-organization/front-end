import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth, withBaseURL, withHeaders } from '@api/middlewares'

const VIA_CEP_URL = 'https://viacep.com.br/ws'

const getAddressByZipCode = async zipCode =>
  tryCatch(http.get, `/${zipCode}/json`, { ...withBaseURL(VIA_CEP_URL) })

const getAddress = async () =>
  http.get('/address', { ...withHeaders(withAuth()) })

const updateAddress = async address =>
  http.put('/address', address, { ...withHeaders(withAuth()) })

export default {
  getAddress,
  getAddressByZipCode,
  updateAddress,
}
