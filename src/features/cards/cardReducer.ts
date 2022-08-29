import { setStatusLoading } from '../../app/appStatusReducer'
import { AppThunk } from '../../app/store'
import { handleError } from '../../common/utils/handleError'

import {
  cardsAPI,
  CardType,
  GetCardsResponseType,
  NewCardType,
  QueryParameterCardsType,
  UpdatedCardType,
} from './cardsAPI'

const initialState: InitialStateCardsType = {} as InitialStateCardsType
// cards: CardType[]
// packUserId: string
// packName: string
// packPrivate: boolean
// packDeckCover: string
// packCreated: Date
// packUpdated: Date
// page: number
// pageCount: number
// cardsTotalCount: number
// minGrade: number
// maxGrade: number
// token: string
// tokenDeathTime: number
// queryParams: QueryParameterCardsType

export const cardsReducer = (
  state: InitialStateCardsType = initialState,
  action: CardsActionsType
): InitialStateCardsType => {
  switch (action.type) {
    case 'pack/SET-CARDS':
      return { ...state, cards: [...action.payload] }
    case 'pack/SET-QUERY-PARAMS-CARDS':
      return { ...state, queryParams: { ...action.payload } }
    default:
      return state
  }
}

// actions
export const setCards = (data: CardType[]) => ({ type: 'pack/SET-CARDS', payload: data } as const)
export const setQueryParamsCards = (data: QueryParameterCardsType) =>
  ({ type: 'pack/SET-QUERY-PARAMS-CARDS', payload: data } as const)

// thunks

export const loadCards =
  (param: QueryParameterCardsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data.cards))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const updateCard =
  (updatedCard: UpdatedCardType, param: QueryParameterCardsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await cardsAPI.updateCard(updatedCard)
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data.cards))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const deletePack =
  (idCard: string, param: QueryParameterCardsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await cardsAPI.deleteCard(idCard)
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data.cards))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }
export const createCard =
  (newCard: NewCardType, param: QueryParameterCardsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await cardsAPI.createCard(newCard)
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data.cards))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

// types
export type CardsActionsType = ReturnType<typeof setCards> | ReturnType<typeof setQueryParamsCards>

export type InitialStateCardsType = GetCardsResponseType & {
  queryParams: QueryParameterCardsType
}
