import { loginAPI, LoginDataType } from './loginAPI'
import { AppThunk } from '../../../app/store'

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
//reducer

const REED_USER = 'REED_USER'
const CREATE_USER = 'CREATE_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

export const loginReducer = (
  state: LoginType = initialState,
  action: LoginActionsType
): LoginType => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, ...action.payload, isLoggedIn: true }
    default:
      return state
  }
}

// action creators
export const createUserAC = (data: LoginType) => {
  return {
    type: CREATE_USER,
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
    },
  } as const
}

//thunk creators
export const createUserTC =
  (data: LoginDataType): AppThunk =>
  (dispatch) => {
    //крутелочка включилась
    loginAPI
      .login(data)
      .then((res) => {
        dispatch(createUserAC(res.data))
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log('Error: ', { ...e })
        console.log(error) //временная заглушка
      })
      .finally(() => {
        //крутелочка выключилась
      })
  }
//types
type createUserTypeAC = ReturnType<typeof createUserAC>

export type LoginActionsType = createUserTypeAC

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
