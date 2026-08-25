import axios from 'axios'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:3001/api'
})

api.interceptors.request.use(
  config => {

    const token =
      localStorage.getItem('token')

    if(token){

      config.headers.Authorization =
        `Bearer ${token}`

    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  response => response,

  error => {

    console.error('API ERROR')
    console.error('STATUS:', error.response?.status)
    console.error('DATA:', error.response?.data)
    console.error('URL:', error.config?.url)

    if(error.response?.status === 401) {

      localStorage.removeItem('token')
      localStorage.removeItem('usuario')

      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
// api.interceptors.response.use(
  // response => response,
//
  // error => {
    // if(error.response?.status === 401) {
      // localStorage.removeItem('token')
      // localStorage.removeItem('usuario')
//
      // window.location.href = '/login'
    // }
    // return Promise.reject(error)
  // }
// )

export default api
