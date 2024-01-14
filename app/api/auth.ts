import { ILoginBody, IRegisterBody } from '../types/Auth'
import api from './api'

export const apiRegister = (body: IRegisterBody) => api.post('/register', body)

export const apiLogin = (body: ILoginBody) => api.post('/login', body)
