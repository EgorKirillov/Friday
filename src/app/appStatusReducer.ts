import { loginAPI } from '../features/auth/login/loginAPI'
import { setIsAuthMeAC } from '../features/auth/login/loginReducer'
import { setUser } from '../features/auth/profile/profileReducer'

import { AppThunk } from './store'

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
    case 'app/SET-INITIALIZE':
      return { ...state, isInitialize: action.payload.value }
    case 'app/SET-STATUS-LOADING':
      return { ...state, status: action.payload.status }
    case 'app/SET-ERROR':
      return { ...state, error: action.payload.errorValue }
    default:
      return state
  }
}

//action creators
const setIsInitializeAC = (value: boolean) => {
  return {
    type: 'app/SET-INITIALIZE',
    payload: { value },
  } as const
}

export const setStatusLoadingAC = (status: RequestStatusType) => {
  return {
    type: 'app/SET-STATUS-LOADING',
    payload: {
      status,
    },
  } as const
}

export const setErrorAC = (errorValue: string | null) => {
  return {
    type: 'app/SET-ERROR',
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
