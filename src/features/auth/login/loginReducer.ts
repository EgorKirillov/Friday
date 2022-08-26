import { AppThunk } from '../../../app/store'
import { setErrorAC, setStatusLoadingAC } from '../../mainPage/UI/startPageReducer'
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
    dispatch(setStatusLoadingAC('loading'))
    loginAPI
      .login(data)
      .then(res => {
        dispatch(setIsAuthMeAC(true))
        dispatch(setUser(res.data))
      })
      .catch(e => {
        dispatch(setErrorAC(e.response.data.error))
      })
      .finally(() => {
        dispatch(setStatusLoadingAC('idle'))
      })
  }
export const setIsLoggedOutTC = (): AppThunk => dispatch => {
  dispatch(setStatusLoadingAC('loading'))
  loginAPI
    .logout()
    .then(res => {
      dispatch(setIsAuthMeAC(false))
    })
    .catch(e => {
      dispatch(setErrorAC(e.response.data.error))
    })
    .finally(() => {
      dispatch(setStatusLoadingAC('idle'))
    })
}

//types
type setIsLoggedInTypeAC = ReturnType<typeof setIsAuthMeAC>

export type LoginActionsType = setIsLoggedInTypeAC

type LoginType = {
  isAuthMe?: boolean
}
