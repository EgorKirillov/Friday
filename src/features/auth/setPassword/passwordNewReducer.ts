import { toast } from 'react-toastify'

import { setStatusLoading } from '../../../app/appStatusReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../common/utils/handleError'

import { PasswordNewAPI } from './passwordNewAPI'

const initialState = {
  success: false,
}

export const passwordNewReducer = (
  state: InitialStateType = initialState,
  action: PasswordNewActionsType
): InitialStateType => {
  switch (action.type) {
    case 'passwordNew/SET-SUCCESS':
      return { ...state, success: action.success }
    default:
      return state
  }
}

// actions
export const setSuccess = (success: boolean) =>
  ({ type: 'passwordNew/SET-SUCCESS', success } as const)

// thunks
export const setNewPassword =
  (password: string, token: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      const res = await PasswordNewAPI.setNewPassword({
        password: password,
        resetPasswordToken: token,
      })

      toast.info(res.data.info)
      dispatch(setSuccess(true))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

// types

export type PasswordNewActionsType = ReturnType<typeof setSuccess>

type InitialStateType = typeof initialState
