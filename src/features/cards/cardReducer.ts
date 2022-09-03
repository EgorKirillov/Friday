import { toast } from 'react-toastify'

import { setStatusLoading } from '../../app/appStatusReducer'
import { AppThunk } from '../../app/store'
import { handleError } from '../../common/utils/handleError'

import {
  cardsAPI,
  GetCardsResponseType,
  NewCardType,
  QueryParameterCardsType,
  UpdatedCardType,
} from './cardsAPI'

const initialState: InitialStateCardsType = {} as InitialStateCardsType

export const cardsReducer = (
  state: InitialStateCardsType = initialState,
  action: CardsActionsType
): InitialStateCardsType => {
  switch (action.type) {
    case 'pack/SET-CARDS':
      return {
        ...state,
        ...action.payload,
        cards: [...action.payload.cards],
      }
    case 'pack/SET-QUERY-PARAMS-CARDS':
      return { ...state, queryParams: { ...action.payload } }
    case 'pack/CLEAR-STATE':
      return {} as InitialStateCardsType
    default:
      return state
  }
}

// actions
export const setCards = (data: GetCardsResponseType) =>
  ({ type: 'pack/SET-CARDS', payload: data } as const)
export const setQueryParamsCards = (data: QueryParameterCardsType) =>
  ({ type: 'pack/SET-QUERY-PARAMS-CARDS', payload: data } as const)
export const clearCardsState = () => ({ type: 'pack/CLEAR-STATE' } as const)

// thunks
export const loadCards =
  (param: QueryParameterCardsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const updateCard =
  (updatedCard: UpdatedCardType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setStatusLoading('loading'))
      await cardsAPI.updateCard(updatedCard)
      const param = getState().cards.queryParams
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const deleteCard =
  (idCard: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setStatusLoading('loading'))
      await cardsAPI.deleteCard(idCard)
      const param = getState().cards.queryParams
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const createCard =
  (newCard: NewCardType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setStatusLoading('loading'))
      toast(JSON.stringify(newCard))
      await cardsAPI.createCard(newCard)
      const param = getState().cards.queryParams // maybe  { ...getState().cards.queryParams, page: 1 }
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

// types
export type CardsActionsType =
  | ReturnType<typeof setCards>
  | ReturnType<typeof setQueryParamsCards>
  | ReturnType<typeof clearCardsState>

export type InitialStateCardsType = GetCardsResponseType & {
  queryParams: QueryParameterCardsType
}
