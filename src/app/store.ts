import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
  forgotPassReducer,
  ForgotPasswordActionsType,
} from '../features/auth/forgotPassword/forgotPassReducer'
import { LoginActionsType, loginReducer } from '../features/auth/login/loginReducer'
import { ProfileActionsType, profileReducer } from '../features/auth/profile/profileReducer'
import { RegisterActionsType, registerReducer } from '../features/auth/register/registerReducer'
import {
  PasswordNewActionsType,
  passwordNewReducer,
} from '../features/auth/setPassword/passwordNewReducer'
import { CardsActionsType, cardsReducer } from '../features/cards/cardReducer'
import { PacksActionsType, packsReducer } from '../features/packs/packReducer'

import { AppStatusActionType, appStatusReducer } from './appStatusReducer'

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
  login: loginReducer,
  profile: profileReducer,
  register: registerReducer,
  forgotPass: forgotPassReducer,
  newPass: passwordNewReducer,
  app: appStatusReducer,
  pack: packsReducer,
  cards: cardsReducer,
})

export const store = legacy_createStore(
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
  | AppStatusActionType
  | PacksActionsType
  | CardsActionsType

// типизация Dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>

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
