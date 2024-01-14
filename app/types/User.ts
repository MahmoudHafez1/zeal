import { ILocation } from './Location'

export interface IUserBody {
  locations?: ILocation[]
  name: string
  email: string
}
export interface IUserParams {
  name: string
  email: string
}
