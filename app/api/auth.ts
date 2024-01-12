import api from './api'

interface IRegisterBody {
  email: string
  password: string
  name: string
}

interface ILoginBody {
  email: string
  password: string
}

export const apiRegister = (body: IRegisterBody) => api.post('/register', body)

export const apiLogin = (body: ILoginBody) => api.post('/login', body)
