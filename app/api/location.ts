import { ILocation } from '../types/Location'
import api from './api'

export const apiGetLocation = () => api.get('/location')

export const apiGetLocations = () => api.get('/location')

export const apiGetUserLocations = (userEmail: string) =>
  api.get(`/location/${userEmail}`)

export const apiDeleteUserLocation = (locationId: number) =>
  api.delete(`/location/${locationId}`)

export const apiAddLocation = (userEmail: string, body: ILocation) =>
  api.post(`/location/${userEmail}`, body)
