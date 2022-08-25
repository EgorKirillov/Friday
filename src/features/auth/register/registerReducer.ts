import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI } from './registeAPI'

const initialState: InitialStateType = {
  isRegistered: false,
  isLoading: false,
  error: '',
}

export const registerReducer = (
  state = initialState,
  action: RegisterActionsType
): InitialStateType => {
  switch (action.type) {
    case 'register/SET-IS-REGISTER': {
      return { ...state, isRegistered: action.isRegistered }
    }
    case 'register/SET-IS-LOADING': {
      return { ...state, isLoading: action.isLoading }
    }
    case 'register/SET-ERROR': {
      return { ...state, error: action.error }
    }
    default: {
      return state
    }
  }
}

export const registerAC = (isRegistered: boolean) =>
  ({ type: 'register/SET-IS-REGISTER', isRegistered } as const)
export const setIsLoadingAC = (isLoading: boolean) =>
  ({ type: 'register/SET-IS-LOADING', isLoading } as const)
export const setRegisterErrorAC = (error: string) =>
  ({ type: 'register/SET-ERROR', error } as const)

// thunks
export const registerTC =
  (data: RegisterParamsType) => (dispatch: Dispatch<RegisterActionsType>) => {
    authAPI
      .register(data)
      .then(res => {
        dispatch(setIsLoadingAC(true))
        if (!res.data.error) {
          dispatch(registerAC(true))
          dispatch(setRegisterErrorAC(''))
        } else {
          dispatch(registerAC(false))
        }
      })
      .catch(error => {
        dispatch(setIsLoadingAC(true))
        dispatch(registerAC(false))
        const err = error as Error | AxiosError<{ error: string }>

        if (axios.isAxiosError(err)) {
          const error = err.response?.data ? err.response.data.error : err.message

          dispatch(setRegisterErrorAC(error))
        } else {
          dispatch(setRegisterErrorAC(`Native error ${err.message}`))
        }
      })
      .finally(() => dispatch(setIsLoadingAC(false)))
  }

// types
type InitialStateType = {
  isRegistered: boolean
  isLoading: boolean
  error: string
}
type SetIsRegisterActionType = ReturnType<typeof registerAC>
type SetIsLoadingType = ReturnType<typeof setIsLoadingAC>
type SetRegisterErrorType = ReturnType<typeof setRegisterErrorAC>

export type RegisterActionsType = SetIsRegisterActionType | SetIsLoadingType | SetRegisterErrorType

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
