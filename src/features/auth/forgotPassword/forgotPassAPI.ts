import { instance } from '../../../app/instanceAPI'

export const ForgotAPI = {
  forgot: (email: string) => {
    const data: ForgotDataType = {
      email: email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message:
        process.env.NODE_ENV === 'development'
          ? '`<div style="color: red; padding: 15px"> password recovery link: <a href=\'http://localhost:3000/#/new_password/$token$\'> link</a> </div>`'
          : '`<div style="color: red; padding: 15px"> password recovery link: <a href=\'https://egorkirillov.github.io/Friday/#/new_password/$token$\'> link</a> </div>`',
    }

    return instance.post<ResponseForgotDataType>('/auth/forgot', data)
  },
}

// пользователь вводит свой емайл на него прийдёт ссылка  хтмл можно любой в ссылке укажите адрес страницы своего фрона
// на локальном бэке не работает слать запрос на хероку

//types
type ForgotDataType = {
  email: string
  from: string
  message: string
}
type ResponseForgotDataType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
}
