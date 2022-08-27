import { instance } from '../../../app/instanceAPI'

export type PasswordNewType = {
  password: string
  resetPasswordToken: string
}
export type ResponsePasswordNewDataType = {
  info?: string //только если пароль принят  "info": "setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—"
  error?: string //  "error": "Password not valid! must be more than 7 characters /ᐠ-ꞈ-ᐟ\\",  "error": "bad token! /ᐠ-ꞈ-ᐟ\\",
}

/*    примеры ответов
{
  "error": "Password not valid! must be more than 7 characters /ᐠ-ꞈ-ᐟ\\",
  "body": {
  "password": "s",
    "resetPasswordToken": "4c321a10-22aa-11ed-9970-e39ba38f3271"
},
  "in": "setNewPassword"
}
{
  "error": "bad token! /ᐠ-ꞈ-ᐟ\\",
  "resetPasswordToken": "4c321a10-222aa-11ed-9970-e39ba38f3271",
  "in": "setNewPassword/User.findOne"
}
*/

export const PasswordNewAPI = {
  setNewPassword: (data: PasswordNewType) => {
    return instance.post<ResponsePasswordNewDataType>('/auth/set-new-password', data)
  },
}
