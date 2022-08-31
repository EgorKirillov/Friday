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
      return {
        ...state,
        cards: [...action.payload.cards],
        packUserId: action.payload.packUserId,
        packName: action.payload.packName,
        packPrivate: action.payload.packPrivate,
        packDeckCover: action.payload.packDeckCover,
        packCreated: action.payload.packCreated,
        packUpdated: action.payload.packUpdated,
        page: action.payload.page,
        pageCount: action.payload.pageCount,
        cardsTotalCount: action.payload.cardsTotalCount,
        minGrade: action.payload.minGrade,
        maxGrade: action.payload.maxGrade,
      }
    case 'pack/SET-QUERY-PARAMS-CARDS':
      return { ...state, queryParams: { ...action.payload } }
    default:
      return state
  }
}

// actions
export const setCards = (data: GetCardsResponseType) =>
  ({ type: 'pack/SET-CARDS', payload: data } as const)
export const setQueryParamsCards = (data: QueryParameterCardsType) =>
  ({ type: 'pack/SET-QUERY-PARAMS-CARDS', payload: data } as const)

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
  (updatedCard: UpdatedCardType, param: QueryParameterCardsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await cardsAPI.updateCard(updatedCard)
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const deleteCard =
  (idCard: string, param: QueryParameterCardsType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await cardsAPI.deleteCard(idCard)
      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data))
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
      toast(JSON.stringify(newCard))
      await cardsAPI.createCard(newCard)

      const res = await cardsAPI.getCards(param)

      dispatch(setCards(res.data))
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
