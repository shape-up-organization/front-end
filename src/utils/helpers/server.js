import { Cookies } from 'react-cookie'

const getJwtToken = () => new Cookies().get('jwt-token')

const objectToQueryString = obj =>
  `?${Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')}`

const imageUrlToFileBlob = async url => {
  const response = await fetch(url)
  const blob = await response.blob()
  return blob
}

export { getJwtToken, imageUrlToFileBlob, objectToQueryString }
