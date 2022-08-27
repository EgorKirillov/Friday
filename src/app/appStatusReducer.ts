//initial state
import { loginAPI } from '../features/auth/login/loginAPI'
import { setIsAuthMeAC } from '../features/auth/login/loginReducer'
import { setUser } from '../features/auth/profile/profileReducer'

import { AppThunk } from './store'

//constants
const SET_INITIALIZE = 'SET_INITIALIZE'
const SET_STATUS_LOADING = 'SET_STATUS_LOADING'
const SET_ERROR = 'SET_ERROR'

const initialState: InitialStateType = {
  isInitialize: false,
  status: 'idle',
  error: null,
}

// reducer
export const appStatusReducer = (
  state: InitialStateType = initialState,
  action: AppStatusActionType
) => {
  switch (action.type) {
    case SET_INITIALIZE:
      return { ...state, isInitialize: action.payload.value }
    case SET_STATUS_LOADING:
      return { ...state, status: action.payload.status }
    case SET_ERROR:
      return { ...state, error: action.payload.errorValue }
    default:
      return state
  }
}

//action creators
const setIsInitializeAC = (value: boolean) => {
  return {
    type: SET_INITIALIZE,
    payload: { value },
  } as const
}

export const setStatusLoadingAC = (status: RequestStatusType) => {
  return {
    type: SET_STATUS_LOADING,
    payload: {
      status,
    },
  } as const
}

export const setErrorAC = (errorValue: string | null) => {
  return {
    type: SET_ERROR,
    payload: {
      errorValue,
    },
  } as const
}

// thunk creators
export const initializeTC = (): AppThunk => dispatch => {
  dispatch(setStatusLoadingAC('loading'))
  loginAPI
    .autMe()
    .then(res => {
      dispatch(setIsAuthMeAC(true))
      dispatch(setErrorAC(null))
      dispatch(setUser(res.data))
    })
    .catch(e => {})
    .finally(() => {
      dispatch(setIsInitializeAC(true))
      dispatch(setStatusLoadingAC('idle'))
    })
}
//type
export type InitialStateType = {
  status: RequestStatusType
  isInitialize: boolean
  error: null | string
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type setIsInitializeTypeAC = ReturnType<typeof setIsInitializeAC>
type setStatusLoadingTypeAC = ReturnType<typeof setStatusLoadingAC>
type setErrorTypeAC = ReturnType<typeof setErrorAC>

export type AppStatusActionType = setIsInitializeTypeAC | setStatusLoadingTypeAC | setErrorTypeAC
