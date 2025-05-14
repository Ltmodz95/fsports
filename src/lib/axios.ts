import axios from 'axios'
import { cookies } from 'next/headers'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})



// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


export default api 