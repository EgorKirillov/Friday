import { AppThunk } from '../../../app/store'
import axios, { AxiosError } from 'axios'
import { ForgotAPI } from './forgotPassAPI'

const initialState = {
  isLoading: false,
  success: false,
  error: '',
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

// thunks
export const sendEmail =
  (email: string): AppThunk =>
  async (dispatch) => {
    try {
      // зануляем ошибки и статус
      dispatch(setError(''))
      dispatch(setSuccess(false))
      // активация крутилки
      dispatch(setIsLoading(true))
      const res = await ForgotAPI.forgot(email)
      // нужно проверить есть ли почта в базе
      // если успешно - зафиксировать
      if (res.data.success) {
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
      console.log('end')
      // де-активация крутилки
      dispatch(setIsLoading(false))
    }
  }

// types
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetErrorType = ReturnType<typeof setError>

export type ForgotPasswordActionsType = SetIsLoadingType | SetSuccessType | SetErrorType
type InitialStateType = typeof initialState
