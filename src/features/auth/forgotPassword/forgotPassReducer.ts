import axios, { AxiosError } from 'axios'

import { AppThunk } from '../../../app/store'

import { ForgotAPI } from './forgotPassAPI'

const initialState = {
  isLoading: false,
  success: false,
  error: '',
  email: 'test@test.test',
}

export const forgotPassReducer = (
  state: InitialStateType = initialState,
  action: ForgotPasswordActionsType
): InitialStateType => {
  switch (action.type) {
    case 'forgotPass/SET-IS-LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'forgotPass/SET-SUCCESS':
      return { ...state, success: action.success }
    case 'forgotPass/SET-ERROR':
      return { ...state, error: action.error }
    case 'forgotPass/SET-EMAIL':
      return { ...state, email: action.email }
    default:
      return state
  }
}

// actions
export const setIsLoading = (isLoading: boolean) =>
  ({ type: 'forgotPass/SET-IS-LOADING', isLoading } as const)
export const setSuccess = (success: boolean) =>
  ({ type: 'forgotPass/SET-SUCCESS', success } as const)
export const setError = (error: string) => ({ type: 'forgotPass/SET-ERROR', error } as const)
export const setEmail = (email: string) => ({ type: 'forgotPass/SET-EMAIL', email } as const)

// thunks
export const sendEmail =
  (email: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setError(''))
      dispatch(setSuccess(false))
      dispatch(setIsLoading(true))
      const res = await ForgotAPI.forgot(email)

      // нужно проверить есть ли почта в базе    <---- отдельный запрос нужен или нет ?
      if (res.data.success) {
        dispatch(setEmail(email))
        dispatch(setSuccess(true))
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setError(error))
      } else {
        dispatch(setError(`Native error ${err.message}`))
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

// types
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetErrorType = ReturnType<typeof setError>
type SetEmailType = ReturnType<typeof setEmail>

export type ForgotPasswordActionsType =
  | SetIsLoadingType
  | SetSuccessType
  | SetErrorType
  | SetEmailType
type InitialStateType = typeof initialState
