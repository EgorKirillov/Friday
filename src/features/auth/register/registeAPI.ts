import { AxiosResponse } from 'axios'

import { instance } from '../../../app/instanceAPI'

import { RegisterParamsType, RegisterResponseType } from './registerReducer'

export const authAPI = {
  register(data: RegisterParamsType) {
    return instance.post<RegisterParamsType, AxiosResponse<RegisterResponseType>>(
      '/auth/register',
      data
    )
  },
}
