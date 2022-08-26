import axios, { AxiosError } from 'axios'

import { AppThunk } from '../../../app/store'
import { setStatusLoadingAC } from '../../mainPage/UI/startPageReducer'
import { ResponseLoginDataType } from '../login/loginAPI'

import { profileAPI } from './profileAPI'

const initialState = {
  isLoading: false,
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

export const profileReducer = (
  state: InitialStateProfileType = initialState,
  action: ProfileActionsType
): InitialStateProfileType => {
  switch (action.type) {
    case 'profile/SET-IS-LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'profile/SET-ERROR':
      return { ...state, error: action.error }
    case 'profile/SET-NAME':
      return { ...state, name: action.name }
    case 'profile/SET-EMAIL':
      return { ...state, email: action.email }
    case 'profile/SET-USER':
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
export const setError = (error: string) => ({ type: 'profile/SET-ERROR', error } as const)
export const setName = (name: string) => ({ type: 'profile/SET-NAME', name } as const)
export const setEmail = (email: string) => ({ type: 'profile/SET-EMAIL', email } as const)
export const setUser = (data: ResponseLoginDataType) => {
  return { type: 'profile/SET-USER', payload: data } as const
}

// thunks

export const updateProfileName =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      // зануляем ошибки и статус
      dispatch(setError(''))
      // активация крутилки
      dispatch(setStatusLoadingAC('loading')) /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
      dispatch(setIsLoading(true)) /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
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
      dispatch(setIsLoading(false)) /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    }
  }

// types
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetErrorType = ReturnType<typeof setError>
type SetNameType = ReturnType<typeof setName>
type SetEmailType = ReturnType<typeof setEmail>
type SetUserType = ReturnType<typeof setUser>

export type ProfileActionsType =
  | SetIsLoadingType
  | SetErrorType
  | SetNameType
  | SetEmailType
  | SetUserType

type InitialStateProfileType = {
  isLoading: boolean
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
