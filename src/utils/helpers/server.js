import { Cookies } from 'react-cookie'

const getJwtToken = () => new Cookies().get('jwt-token')

export { getJwtToken }
