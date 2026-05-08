import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor — agrega el token automáticamente a cada petición
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor — maneja errores de token expirado
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      // Token expirado — cerrar sesión
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api