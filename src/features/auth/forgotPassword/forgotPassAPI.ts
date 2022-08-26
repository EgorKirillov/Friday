import { DEV_VERSION } from '../../../config'
import { instance } from '../../mainPage/instanceAPI'

export type ForgotDataType = {
  email: string
  from: string
  message: string
}
export type ResponseForgotDataType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
}

export const ForgotAPI = {
  forgot: (email: string) => {
    return instance.post<ResponseForgotDataType>('/auth/forgot', {
      email: email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: !DEV_VERSION
        ? '`<div style="color: red; padding: 15px"> password recovery link: <a href=\'http://localhost:3000/new_password/$token$\'> link</a> </div>`'
        : '`<div style="color: red; padding: 15px"> password recovery link: <a href=\'https://egorkirillov.github.io/new_password/$token$\'> link</a> </div>`',
    })
  },
}

// пользователь вводит свой емайл на него прийдёт ссылка  хтмл можно любой в ссылке укажите адрес страницы своего фрона
// на локальном бэке не работает слать запрос на хероку
