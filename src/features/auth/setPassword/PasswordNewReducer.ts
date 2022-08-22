import { AppThunk } from '../../../app/store'
import axios, { AxiosError } from 'axios'

const initialState = {
  isLoading: false,
  success: false,
  error: '',
  password: 'testtesttest',
}

export const passwordNewReducer = (
  state: InitialStateType = initialState,
  action: PasswordNewActionsType
): InitialStateType => {
  switch (action.type) {
    case 'passwordNew/SET-IS-LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'passwordNew/SET-SUCCESS':
      return { ...state, success: action.success }
    case 'passwordNew/SET-ERROR':
      return { ...state, error: action.error }
    case 'passwordNew/SET-PASSWORD':
      return { ...state, password: action.password }
    default:
      return state
  }
}

// actions
export const setIsLoading = (isLoading: boolean) =>
  ({ type: 'passwordNew/SET-IS-LOADING', isLoading } as const)
export const setSuccess = (success: boolean) =>
  ({ type: 'passwordNew/SET-SUCCESS', success } as const)
export const setError = (error: string) => ({ type: 'passwordNew/SET-ERROR', error } as const)
export const setPassword = (password: string) =>
  ({ type: 'passwordNew/SET-PASSWORD', password } as const)

// thunks
export const setNewPassword =
  (password: string): AppThunk =>
  async (dispatch) => {
    try {
      // зануляем ошибки и статус
      dispatch(setError(''))
      dispatch(setSuccess(false))
      // активация крутилки
      dispatch(setIsLoading(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>
      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setError(error))
      } else {
        dispatch(setError(`Native error ${err.message}`))
      }
    } finally {
      // де-активация крутилки
      dispatch(setIsLoading(false))
    }
  }

// types
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetErrorType = ReturnType<typeof setError>
type SetPasswordType = ReturnType<typeof setPassword>

export type PasswordNewActionsType =
  | SetIsLoadingType
  | SetSuccessType
  | SetErrorType
  | SetPasswordType
type InitialStateType = typeof initialState
