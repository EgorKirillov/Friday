import { setStatusLoading } from '../../../app/appStatusReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../common/utils/handleError'

import { ForgotAPI } from './forgotPassAPI'

const initialState = {
  success: false,
  email: 'test@test.test',
}

export const forgotPassReducer = (
  state: InitialStateType = initialState,
  action: ForgotPasswordActionsType
): InitialStateType => {
  switch (action.type) {
    case 'forgotPass/SET-SUCCESS':
      return { ...state, success: action.success }
    case 'forgotPass/SET-EMAIL':
      return { ...state, email: action.email }
    default:
      return state
  }
}

// actions
export const setSuccess = (success: boolean) =>
  ({ type: 'forgotPass/SET-SUCCESS', success } as const)
export const setEmail = (email: string) => ({ type: 'forgotPass/SET-EMAIL', email } as const)

// thunks
export const sendEmail =
  (email: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await ForgotAPI.forgot(email)

      dispatch(setEmail(email))
      dispatch(setSuccess(true))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

// types
type SetSuccessType = ReturnType<typeof setSuccess>
type SetEmailType = ReturnType<typeof setEmail>

export type ForgotPasswordActionsType = SetSuccessType | SetEmailType
type InitialStateType = typeof initialState
