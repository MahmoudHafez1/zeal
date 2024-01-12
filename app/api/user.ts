import api from './api'

interface IUserBody {
  locations: { lat: string; lng: string }[]
  name: string
  email: string
}

export const apiGetUsers = () => api.get('/user')

export const apiAddUser = (body: IUserBody) => api.post('/user', body)

export const apiEditUser = (userEmail: string, body: IUserBody) =>
  api.patch(`/user/${userEmail}`, body)

export const apiDeleteUser = (userEmail: string) =>
  api.delete(`/user/${userEmail}`)
