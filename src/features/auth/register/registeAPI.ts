import { RegisterParamsType } from './registerReducer'
import { instance } from '../../mainPage/instanceAPI'

export const authAPI = {
  register(data: RegisterParamsType) {
    let email = data.addedUser.email
    let password = data.addedUser.password

    return instance.post<RegisterParamsType>('/auth/register', { email, password })
  },
}
