import { setStatusLoading } from '../../../app/appStatusReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../common/utils/handleError'

import { authAPI, RegisterParamsType } from './registeAPI'

const initialState = {
  isRegistered: false,
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
export const setRegisterError = (error: string) => ({ type: 'register/SET-ERROR', error } as const)

// thunk creators
export const registerTC =
  (data: RegisterParamsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await authAPI.register(data)
      dispatch(setRegisterError(''))
      dispatch(setIsRegister(true))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

// types
type InitialStateType = typeof initialState

export type RegisterActionsType =
  | ReturnType<typeof setIsRegister>
  | ReturnType<typeof setRegisterError>
