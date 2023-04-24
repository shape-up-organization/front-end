import { http } from '@api/lib/http'
import { tryCatch } from '@api/lib/tryCatch'

import { withAuth } from '@api/middlewares/withAuth'
import { withBaseURL } from '@api/middlewares/withBaseURL'
import { withHeaders } from '@api/middlewares/withHeaders'

const VIA_CEP_URL = 'https://viacep.com.br/ws'

const getAddressByZipCode = async zipCode =>
  tryCatch(http.get, `/${zipCode}/json`, withBaseURL(VIA_CEP_URL))

const getAddress = async () => http.get('/address', withHeaders(withAuth()))

const updateAddress = async address =>
  http.put('/address', address, withHeaders(withAuth()))

export default {
  getAddress,
  getAddressByZipCode,
  updateAddress,
}
