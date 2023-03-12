import axios from 'axios'

export const create = async payload => {
  return await axios.post('http://localhost:7000/users', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
