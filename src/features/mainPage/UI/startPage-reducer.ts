//initial state
import { AppThunk } from '../../../app/store'
import { setIsLoggedInAC } from '../../auth/login/login-reducer'
import { loginAPI } from '../../auth/login/loginAPI'

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
export const StartPageReducer = (
  state: InitialStateType = initialState,
  action: StartPageActionType
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
      dispatch(setIsLoggedInAC(res.data, true))
      dispatch(setErrorAC(null))
    })
    .catch(e => {
      // const error = e.response ? e.response.data.error : e.message + ', more details in the console'
      // if (e.response.status === 401) {
      //   dispatch(setErrorAC('ты не залогинен!'))
      // }
      if (e.response.status === 400) {
        dispatch(setErrorAC('Email or password is incorrect'))
      }
    })
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

export type StartPageActionType = setIsInitializeTypeAC | setStatusLoadingTypeAC | setErrorTypeAC
