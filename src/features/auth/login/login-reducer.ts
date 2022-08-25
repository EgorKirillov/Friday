import { AppThunk } from '../../../app/store'
import { setStatusLoadingAC } from '../../mainPage/UI/startPage-reducer'

import { loginAPI, LoginDataType } from './loginAPI'

const initialState: LoginType = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: null,
  // количество колод

  created: null,
  updated: null,
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  error: '',
  isLoggedIn: false,
}

const SET_IS_LOGGED_IN = 'LOGIN/SET_IS_LOGGED_IN'
const SET_IS_LOGGED_OUT = 'LOGIN/SET_IS_LOGGED_OUT'

export const loginReducer = (
  state: LoginType = initialState,
  action: LoginActionsType
): LoginType => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return { ...state, ...action.payload }
    case SET_IS_LOGGED_OUT:
      return { ...state, isLoggedIn: action.payload.value }
    default:
      return state
  }
}

// action creators
export const setIsLoggedInAC = (data: LoginType, value: boolean) => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: {
      _id: data._id,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
      publicCardPacksCount: data.publicCardPacksCount,
      created: data.created,
      updated: data.updated,
      isAdmin: data.isAdmin,
      verified: data.verified,
      rememberMe: data.rememberMe,

      error: data.error,
      isLoggedIn: value,
    },
  } as const
}
export const setIsLoggedOutAC = (value: boolean) => {
  return {
    type: SET_IS_LOGGED_OUT,
    payload: {
      value,
    },
  } as const
}

//thunk creators
export const setIsLoggedInTC =
  (data: LoginDataType): AppThunk =>
  dispatch => {
    dispatch(setStatusLoadingAC('loading'))
    loginAPI
      .login(data)
      .then(res => {
        dispatch(setIsLoggedInAC(res.data, true))
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log('Error: ', { ...e })
        console.log(error) //временная заглушка
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
      dispatch(setIsLoggedOutAC(false))
    })
    .catch(e => {
      const error = e.response ? e.response.data.error : e.message + ', more details in the console'

      console.log('Error: ', { ...e })
      console.log(error) //временная заглушка
    })
    .finally(() => {
      dispatch(setStatusLoadingAC('idle'))
    })
}

//types
type setIsLoggedInTypeAC = ReturnType<typeof setIsLoggedInAC>
type setIsLoggedOutTypeAC = ReturnType<typeof setIsLoggedOutAC>

export type LoginActionsType = setIsLoggedInTypeAC | setIsLoggedOutTypeAC

type LoginType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number | null
  // количество колод

  created: Date | null
  updated: Date | null
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
  isLoggedIn?: boolean
}
