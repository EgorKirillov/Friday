import { AppThunk } from '../../../app/store'
import { handleError } from '../../../common/utils/handleError'

import { PasswordNewAPI } from './passwordNewAPI'

const initialState = {
  isLoading: false,
  success: false,
  error: '',
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

// thunks
export const setNewPassword =
  (password: string, token: string): AppThunk =>
  async dispatch => {
    try {
      // зануляем ошибки и статус
      dispatch(setError(''))
      dispatch(setSuccess(false))
      // активация крутилки
      dispatch(setIsLoading(true))
      await PasswordNewAPI.setNewPassword({
        password: password,
        resetPasswordToken: token,
      })

      dispatch(setSuccess(true))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      // де-активация крутилки
      dispatch(setIsLoading(false))
    }
  }

// types
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetErrorType = ReturnType<typeof setError>

export type PasswordNewActionsType = SetIsLoadingType | SetSuccessType | SetErrorType

type InitialStateType = typeof initialState
