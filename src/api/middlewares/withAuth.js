import { getJwtToken } from '@utils/helpers/server'

const withAuth = () => ({
  Authorization: `Bearer ${getJwtToken()}`,
})

export { withAuth }
