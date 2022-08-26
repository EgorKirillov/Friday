import axios, { AxiosError } from 'axios'

import { AppThunk } from '../../../app/store'
import { setStatusLoadingAC } from '../../mainPage/UI/startPageReducer'
import { ResponseLoginDataType } from '../login/loginAPI'

import { profileAPI } from './profileAPI'

const initialState = {
  isLoading: false,
  isInitialised: false,
  //добавить аватарку

  _id: '',
  email: '',
  name: '',
  avatar: null,
  publicCardPacksCount: null,
  // количество колод

  created: null,
  updated: null,
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  error: '',
}

const SET_USER = 'PROFILE/SET_USER'

export const profileReducer = (
  state: InitialStateProfileType = initialState,
  action: ProfileActionsType
): InitialStateProfileType => {
  switch (action.type) {
    case 'profile/SET-IS-LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'profile/SET-IS-INITIALISED':
      return { ...state, isInitialised: action.isInitialised }
    case 'profile/SET-ERROR':
      return { ...state, error: action.error }
    case 'profile/SET-NAME':
      return { ...state, name: action.name }
    case 'profile/SET-EMAIL':
      return { ...state, email: action.email }
    case SET_USER:
      return {
        ...state,
        _id: action.payload._id,
        email: action.payload.email,
        name: action.payload.name,
        avatar: action.payload.avatar,
        publicCardPacksCount: action.payload.publicCardPacksCount,
        created: action.payload.created,
        updated: action.payload.updated,
        isAdmin: action.payload.isAdmin,
        verified: action.payload.verified,
        rememberMe: action.payload.rememberMe,

        error: action.payload.error,
      }
    default:
      return state
  }
}

// actions
export const setIsLoading = (isLoading: boolean) =>
  ({ type: 'profile/SET-IS-LOADING', isLoading } as const)
export const setIsInitialised = (isInitialised: boolean) =>
  ({ type: 'profile/SET-IS-INITIALISED', isInitialised } as const)
export const setError = (error: string) => ({ type: 'profile/SET-ERROR', error } as const)
export const setName = (name: string) => ({ type: 'profile/SET-NAME', name } as const)
export const setEmail = (email: string) => ({ type: 'profile/SET-EMAIL', email } as const)

export const setUserAC = (data: ResponseLoginDataType) => {
  return {
    type: SET_USER,
    payload: data,
  } as const
}

// thunks

export const setProfile = (): AppThunk => async dispatch => {
  try {
    // зануляем ошибки и статус
    dispatch(setError(''))

    // активация крутилки не требуется
    // dispatch(setIsLoading(true))
    const res = await profileAPI.auth()

    dispatch(setName(res.data.name))
    dispatch(setEmail(res.data.email))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setError(error))
    } else {
      dispatch(setError(`Native error ${err.message}`))
    }
  } finally {
    //инициализация прошла
    dispatch(setIsInitialised(true))
    // де-активация крутилки не требуется
    // dispatch(setIsLoading(false))
  }
}

export const updateProfileName =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      // зануляем ошибки и статус
      dispatch(setError(''))
      // активация крутилки
      dispatch(setStatusLoadingAC('loading')) /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
      // dispatch(setIsLoading(true))               /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
      //доработать при добавлении аватарки
      const data = { name: name, avatar: '' }
      const res = await profileAPI.update(data)

      dispatch(setName(res.data.updatedUser.name))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setError(error))
      } else {
        dispatch(setError(`Native error ${err.message}`))
      }
    } finally {
      // де-активация крутилки
      dispatch(setStatusLoadingAC('idle')) /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
      // dispatch(setIsLoading(false))            /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    }
  }

export const logoutProfile = (): AppThunk => async dispatch => {
  try {
    // зануляем ошибки и статус
    dispatch(setError(''))
    // активация крутилки
    dispatch(setIsLoading(true))
    await profileAPI.logout()

    dispatch(setName(''))
    dispatch(setEmail(''))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setError(error))
    } else {
      dispatch(setError(`Native error ${err.message}`))
    }
  } finally {
    // де-активация крутилки
    dispatch(setIsLoading(false))
  }
}

// types
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetIsInitialisedType = ReturnType<typeof setIsInitialised>
type SetErrorType = ReturnType<typeof setError>
type SetNameType = ReturnType<typeof setName>
type SetEmailType = ReturnType<typeof setEmail>

type SetUserAC = ReturnType<typeof setUserAC>

export type ProfileActionsType =
  | SetIsLoadingType
  | SetIsInitialisedType
  | SetErrorType
  | SetNameType
  | SetEmailType
  | SetUserAC

type InitialStateProfileType = {
  isLoading: boolean
  isInitialised: boolean
  //добавить аватарку

  _id: string
  email: string
  name: string
  avatar: null | string
  publicCardPacksCount: null | number
  // количество колод

  created: Date | null
  updated: Date | null
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: null | string
}
