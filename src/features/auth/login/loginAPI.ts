import { AxiosResponse } from 'axios'

import { instance } from '../../../app/instanceAPI'

export const loginAPI = {
  login(data: LoginDataType) {
    return instance.post<LoginDataType, AxiosResponse<ResponseLoginDataType>>('/auth/login', data)
  },
  logout() {
    return instance.delete<{}, AxiosResponse<ResponseLogoutDataType>>('/auth/me')
  },
  autMe() {
    return instance.post<{}, AxiosResponse<ResponseLoginDataType>>('/auth/me')
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
  avatar: string | null
  publicCardPacksCount: number

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

export type ResponseLogoutDataType = {
  info: 'logOut success —ฅ/ᐠ.̫ .ᐟฅ—'
  error: string
}
