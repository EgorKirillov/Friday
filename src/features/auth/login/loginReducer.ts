import { setStatusLoading } from '../../../app/appStatusReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../common/utils/handleError'
import { setUser } from '../profile/profileReducer'

import { loginAPI, LoginDataType } from './loginAPI'

const initialState: LoginType = {
  isAuthMe: false,
}

export const loginReducer = (
  state: LoginType = initialState,
  action: LoginActionsType
): LoginType => {
  switch (action.type) {
    case 'login/SET_IS_AUTH_ME':
      return { ...state, isAuthMe: action.payload.value }
    default:
      return state
  }
}

// action creators
export const setIsAuthMeAC = (value: boolean) => {
  return {
    type: 'login/SET_IS_AUTH_ME',
    payload: { value },
  } as const
}

//thunk creators
export const setUserTC =
  (data: LoginDataType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      const res = await loginAPI.login(data)

      dispatch(setIsAuthMeAC(true))
      dispatch(setUser(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }
export const setIsLoggedOutTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setStatusLoading('loading'))
    await loginAPI.logout()

    dispatch(setIsAuthMeAC(false))
    dispatch(setStatusLoading('succeeded'))
  } catch (e) {
    handleError(e, dispatch)
  }
}

//types
type setIsLoggedInTypeAC = ReturnType<typeof setIsAuthMeAC>

export type LoginActionsType = setIsLoggedInTypeAC

type LoginType = {
  isAuthMe?: boolean
}
