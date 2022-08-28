import axios, { AxiosError } from 'axios'

import { AppThunk } from '../../../app/store'

import { authAPI } from './registeAPI'

const initialState = {
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
//action creators
export const setIsRegister = (isRegistered: boolean) =>
  ({ type: 'register/SET-IS-REGISTER', isRegistered } as const)
export const setIsLoading = (isLoading: boolean) =>
  ({ type: 'register/SET-IS-LOADING', isLoading } as const)
export const setRegisterError = (error: string) => ({ type: 'register/SET-ERROR', error } as const)

// thunk creators
export const registerTC =
  (data: RegisterParamsType): AppThunk =>
  dispatch => {
    dispatch(setIsLoading(true))
    authAPI
      .register(data)
      .then(res => {
        if (!res.data.error) {
          dispatch(setIsRegister(true))
          dispatch(setRegisterError(''))
        } else {
          dispatch(setIsRegister(false))
          dispatch(setRegisterError(res.data.error))
        }
      })
      .catch(error => {
        dispatch(setIsRegister(false))
        const err = error as Error | AxiosError<{ error: string }>

        if (axios.isAxiosError(err)) {
          const error = err.response?.data ? err.response.data.error : err.message

          dispatch(setRegisterError(error))
        } else {
          dispatch(setRegisterError(`Native error ${err.message}`))
        }
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

// types
type InitialStateType = typeof initialState

type SetIsRegisterType = ReturnType<typeof setIsRegister>
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetRegisterErrorType = ReturnType<typeof setRegisterError>

export type RegisterActionsType = SetIsRegisterType | SetIsLoadingType | SetRegisterErrorType

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
