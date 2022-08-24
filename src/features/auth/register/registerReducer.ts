import { Dispatch } from 'redux'
import { authAPI } from './registeAPI'

const initialState: InitialStateType = {
  isRegistered: false,
  isLoading: false,
}

export const registerReducer = (
  state = initialState,
  action: RegisterActionsType
): InitialStateType => {
  switch (action.type) {
    case 'register/SET-IS-REGISTER': {
      return { ...state, isRegistered: action.isRegistered }
    }
    case 'register/SET-IS-LOADING': {
      return { ...state, isLoading: action.isLoading }
    }
    default: {
      return state
    }
  }
}

export const registerAC = (isRegistered: boolean) =>
  ({ type: 'register/SET-IS-REGISTER', isRegistered } as const)
export const setIsLoading = (isLoading: boolean) =>
  ({ type: 'register/SET-IS-LOADING', isLoading } as const)

// thunks
export const registerTC = (data: any) => (dispatch: Dispatch<RegisterActionsType>) => {
  dispatch(registerAC(true))
  authAPI
    .register(data)
    .then(res => {
      if (!res.data.error) {
        dispatch(registerAC(true))
      }
    })
    .catch(error => {
      dispatch(registerAC(false))
      {
        // error.message ? error.message : 'Some error occurred'
      }
    })
}

// types
type InitialStateType = {
  isRegistered: boolean
  isLoading: boolean
}
type SetIsRegisterActionType = ReturnType<typeof registerAC>
type SetIsLoadingType = ReturnType<typeof setIsLoading>

export type RegisterActionsType = SetIsRegisterActionType | SetIsLoadingType

export type RegisterParamsType = {
  addedUser: {
    email: string
    password: string
  }
  error?: string
}
