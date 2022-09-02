import { AxiosResponse } from 'axios'

import { instance } from '../../../app/instanceAPI'

export const authAPI = {
  register(data: RegisterParamsType) {
    return instance.post<RegisterParamsType, AxiosResponse<RegisterResponseType>>(
      '/auth/register',
      data
    )
  },
}

//types
export type RegisterParamsType = {
  email: string
  password: string
}
export type RegisterResponseType = {
  addedUser: {
    email: string
    password: string
  }
  error?: string
}
