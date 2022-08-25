import { combineReducers, applyMiddleware, compose, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
  forgotPassReducer,
  ForgotPasswordActionsType,
} from '../features/auth/forgotPassword/forgotPassReducer'
import { LoginActionsType, loginReducer } from '../features/auth/login/login-reducer'
import { ProfileActionsType, profileReducer } from '../features/auth/profile/profile-reducer'
import { RegisterActionsType, registerReducer } from '../features/auth/register/registerReducer'
import {
  PasswordNewActionsType,
  passwordNewReducer,
} from '../features/auth/setPassword/PasswordNewReducer'

// необходимо для работы расширения Redux
//             v

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//             ^
// необходимо для работы расширения Redux

// объединяем рутовый Reducer
const rootReducer = combineReducers({
  login: loginReducer, // login and registration, recovery and change password
  profile: profileReducer, // create/change profile data
  register: registerReducer, // registration
  forgotPass: forgotPassReducer,
  newPass: passwordNewReducer,
})

export const store = legacy_createStore(
  // export const store = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(thunk), composeEnhancers())
)

// Общий State Type
export type AppRootStateType = ReturnType<typeof store.getState>

// Общий Action Type
export type AppActionType =
  | LoginActionsType
  | ProfileActionsType
  | ForgotPasswordActionsType
  | PasswordNewActionsType
  | RegisterActionsType

// Dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
// export const useAppDispatch: () => AppDispatch = useDispatch

// типизация Thunk Action для всего объекта
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionType
>

// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
