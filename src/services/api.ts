import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize API errors and eagerly drop an invalid token
    if (error?.response?.status === 401) {
      localStorage.removeItem('token')
    }

    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Unexpected error'

    return Promise.reject(new Error(message))
  }
)
