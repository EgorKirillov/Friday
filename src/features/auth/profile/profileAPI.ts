import { AxiosResponse } from 'axios'

import { instance } from '../../../app/instanceAPI'

export const profileAPI = {
  update(data: ChangeProfileDataType) {
    return instance.put<ChangeProfileDataType, AxiosResponse<ResponseUpdateProfileDataType>>(
      '/auth/me',
      data
    )
  },
}

export type ChangeProfileDataType = {
  name?: string
  avatar?: string
}
export type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean // подтвердил ли почту
  publicCardPacksCount: number
  created?: Date
  updated?: Date
  __v?: 0
  token?: string
  tokenDeathTime?: number
  avatar?: string
  error?: string
}

export type ResponseUpdateProfileDataType = {
  updatedUser: ProfileType
  error?: string
}
