import { toast } from 'react-toastify'

import { setError, setStatusLoading } from '../../../app/appStatusReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../common/utils/handleError'
import { setUser } from '../profile/profileReducer'

import { loginAPI, LoginDataType } from './loginAPI'

const initialState: LoginType = {
  isAuthMe: false,
}

const SET_IS_AUTH_ME = 'LOGIN/SET_IS_AUTH_ME'

export const loginReducer = (
  state: LoginType = initialState,
  action: LoginActionsType
): LoginType => {
  switch (action.type) {
    case SET_IS_AUTH_ME:
      return { ...state, isAuthMe: action.payload.value }
    default:
      return state
  }
}

// action creators
export const setIsAuthMeAC = (value: boolean) => {
  return {
    type: SET_IS_AUTH_ME,
    payload: {
      value,
    },
  } as const
}

//thunk creators
export const setUserTC =
  (data: LoginDataType): AppThunk =>
  dispatch => {
    dispatch(setStatusLoading('loading'))
    loginAPI
      .login(data)
      .then(res => {
        dispatch(setIsAuthMeAC(true))
        dispatch(setUser(res.data))
        toast.info(`${res.data.name}, you are logged in`)
      })
      .catch(e => {
        handleError(e, dispatch)
      })
      .finally(() => {
        dispatch(setStatusLoading('idle'))
      })
  }
export const setIsLoggedOutTC = (): AppThunk => dispatch => {
  dispatch(setStatusLoading('loading'))
  loginAPI
    .logout()
    .then(res => {
      dispatch(setIsAuthMeAC(false))
    })
    .catch(e => {
      dispatch(setError(e.response.data.error))
    })
    .finally(() => {
      dispatch(setStatusLoading('idle'))
    })
}

//types
type setIsLoggedInTypeAC = ReturnType<typeof setIsAuthMeAC>

export type LoginActionsType = setIsLoggedInTypeAC

type LoginType = {
  isAuthMe?: boolean
}
