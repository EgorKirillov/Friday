import { AxiosResponse } from 'axios'

import { instance } from '../../mainPage/instanceAPI'

export const profileAPI = {
  auth() {
    return instance.post<ResponseProfileDataType>('/auth/me', {})
  },
  update(data: ChangeProfileDataType) {
    return instance.put<ChangeProfileDataType, AxiosResponse<ResponseProfileDataType>>(
      '/auth/me',
      data
    )
  },
  logout() {
    return instance.delete<ResponseLogoutDataType>('/auth/me', {})
  },
}

export type ChangeProfileDataType = {
  name: string
  avatar: string
}

export type ResponseProfileDataType = {
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

export type ResponseLogoutDataType = {
  info: string
  error: string
}
