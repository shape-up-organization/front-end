import { Cookies } from 'react-cookie'

const getJwtToken = () => new Cookies().get('jwt-token')

const objectToQueryString = obj =>
  `?${Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')}`

export { getJwtToken, objectToQueryString }
