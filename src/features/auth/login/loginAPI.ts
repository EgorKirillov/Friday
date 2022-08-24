import { AxiosResponse } from 'axios'
import { instance } from '../../mainPage/instanceAPI'

export const loginAPI = {
  login(data: LoginDataType) {
    return instance.post<LoginDataType, AxiosResponse<ResponseLoginDataType>>('/auth/login', data)
  },
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ResponseLoginDataType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}
