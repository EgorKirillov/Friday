import { instance } from '../../mainPage/instanceAPI'

import { RegisterParamsType } from './registerReducer'

export const authAPI = {
  register(data: RegisterParamsType) {
    let email = data.addedUser.email
    let password = data.addedUser.password

    return instance.post<RegisterParamsType>('/auth/register', { email, password })
  },
}
