import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

export default axios.create({
  baseURL: process.env.API_ENDPOINT,
  timeout: 10000,
  adapter: cache.adapter
})
