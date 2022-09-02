import { instance } from '../../../app/instanceAPI'

export const PasswordNewAPI = {
  setNewPassword: (data: PasswordNewType) => {
    return instance.post<ResponsePasswordNewDataType>('/auth/set-new-password', data)
  },
}

//types
export type PasswordNewType = {
  password: string
  resetPasswordToken: string
}

export type ResponsePasswordNewDataType = {
  info?: string //только если пароль принят  "info": "setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—"
  error?: string //  "error": "Password not valid! must be more than 7 characters /ᐠ-ꞈ-ᐟ\\",  "error": "bad token! /ᐠ-ꞈ-ᐟ\\",
}
