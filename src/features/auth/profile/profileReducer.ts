import axios, { AxiosError } from 'axios'

import { AppThunk } from '../../../app/store'

import { profileAPI } from './profileAPI'

const initialState = {
  isLoading: false,
  isAuth: false,
  isInitialised: false,
  error: '',
  name: '111',
  email: 'testEmail-noAuth',
  //добавить аватарку
}

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
    case 'profile/SET-IS-AUTH':
      return { ...state, isAuth: action.isAuth }
    default:
      return state
  }
}

// actions
export const setIsLoading = (isLoading: boolean) =>
  ({ type: 'profile/SET-IS-LOADING', isLoading } as const)
export const setIsInitialised = (isInitialised: boolean) =>
  ({ type: 'profile/SET-IS-INITIALISED', isInitialised } as const)
export const setIsAuth = (isAuth: boolean) => ({ type: 'profile/SET-IS-AUTH', isAuth } as const)
export const setError = (error: string) => ({ type: 'profile/SET-ERROR', error } as const)
export const setName = (name: string) => ({ type: 'profile/SET-NAME', name } as const)
export const setEmail = (email: string) => ({ type: 'profile/SET-EMAIL', email } as const)

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
    dispatch(setIsAuth(true))
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
      dispatch(setIsLoading(true))
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
      dispatch(setIsLoading(false))
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
    dispatch(setIsAuth(false))
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
type SetIsAuthType = ReturnType<typeof setIsAuth>

export type ProfileActionsType =
  | SetIsLoadingType
  | SetIsInitialisedType
  | SetErrorType
  | SetNameType
  | SetEmailType
  | SetIsAuthType

type InitialStateProfileType = typeof initialState
