import api from './api'

export const apiGetLocation = () => api.get('/location')

interface ILocationBody {
  lat: string
  lng: string
}

export const apiGetLocations = () => api.get('/location')

export const apiGetUserLocations = (userEmail: string) =>
  api.get(`/location/${userEmail}`)

export const apiDeleteUserLocation = () => (locationId: string) =>
  api.delete(`/location/${locationId}`)

export const apiAddLocation = (userEmail: string, body: ILocationBody) =>
  api.post(`/location/${userEmail}`, body)
