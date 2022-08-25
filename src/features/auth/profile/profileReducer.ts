import axios, { AxiosError } from 'axios'

import { AppThunk } from '../../../app/store'

const initialState = {
  isLoading: false,
  success: false,
  error: '',
  name: 'testName',
}

export const profileReducer = (
  state: InitialStateProfileType = initialState,
  action: ProfileActionsType
): InitialStateProfileType => {
  switch (action.type) {
    case 'profile/SET-IS-LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'profile/SET-SUCCESS':
      return { ...state, success: action.success }
    case 'profile/SET-ERROR':
      return { ...state, error: action.error }
    case 'profile/SET-NAME':
      return { ...state, error: action.name }
    default:
      return state
  }
}

// actions
export const setIsLoading = (isLoading: boolean) =>
  ({ type: 'profile/SET-IS-LOADING', isLoading } as const)
export const setSuccess = (success: boolean) => ({ type: 'profile/SET-SUCCESS', success } as const)
export const setError = (error: string) => ({ type: 'profile/SET-ERROR', error } as const)
export const setName = (name: string) => ({ type: 'profile/SET-NAME', name } as const)

// thunks
/*
export const setNewPassword =
  (password: string, token: string): AppThunk =>
    async dispatch => {
      try {
        // зануляем ошибки и статус
        dispatch(setError(''))
        dispatch(setSuccess(false))
        // активация крутилки
        dispatch(setIsLoading(true))
        const res = await PasswordNewAPI.setNewPassword({
          password: password,
          resetPasswordToken: token,
        })
        
        dispatch(setSuccess(true))
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
*/

// types
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetErrorType = ReturnType<typeof setError>
type SetNameType = ReturnType<typeof setName>

export type ProfileActionsType = SetIsLoadingType | SetSuccessType | SetErrorType | SetNameType

type InitialStateProfileType = typeof initialState
