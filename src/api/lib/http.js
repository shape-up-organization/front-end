import axios from 'axios'

const prefixes = ['/shapeup']

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL + prefixes.join('')}`,
  headers: { 'Content-Type': 'application/json' },
})
