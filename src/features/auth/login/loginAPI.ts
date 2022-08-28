import { AxiosResponse } from 'axios'

import { instance } from '../../../app/instanceAPI'
import { ProfileType } from '../profile/profileAPI'

export const loginAPI = {
  login(data: LoginDataType) {
    return instance.post<LoginDataType, AxiosResponse<ProfileType>>('/auth/login', data)
  },
  logout() {
    return instance.delete<ProfileType>('/auth/me')
  },
  autMe() {
    return instance.post<ProfileType>('/auth/me')
  },
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
// type ResponseLoginDataType = ProfileType
//   {
//   _id: string
//   email: string
//   name: string
//   avatar: string | null
//   publicCardPacksCount: number
//
//   created: Date
//   updated: Date
//   isAdmin: boolean
//   verified: boolean // подтвердил ли почту
//   rememberMe: boolean
//
//   error?: string
// }

export type ResponseLogoutDataType = {
  info: string
  error: string
}
