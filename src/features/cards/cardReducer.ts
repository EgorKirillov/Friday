import { toast } from 'react-toastify'

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

const initialState: InitialStateCardsType = {
  cards: [] as CardType[],
  packUserId: '',
  packName: '',
  packPrivate: false,
  packDeckCover: '',
  packCreated: '',
  packUpdated: '',
  page: 1,
  pageCount: 1,
  cardsTotalCount: 1,
  minGrade: 0,
  maxGrade: 0,
  modalEdit: false,
  modalCreate: false,
  modalDelete: false,
  queryParams: {} as QueryParameterCardsType,
}

export const cardsReducer = (
  state: InitialStateCardsType = initialState,
  action: CardsActionsType
): InitialStateCardsType => {
  switch (action.type) {
    case 'card/SET-CARDS':
      return {
        ...state,
        ...action.payload,
        cards: [...action.payload.cards],
      }
    case 'card/UPDATE-CARD-GRADE':
      return {
        ...state,
        cards: state.cards.map(card =>
          card._id === action.cardID ? { ...card, grade: action.grade, shots: action.shots } : card
        ),
      }
    case 'card/SET-QUERY-PARAMS-CARDS':
      return { ...state, queryParams: { ...action.payload } }
    case 'pack/CLEAR-STATE':
      return {} as InitialStateCardsType
    case 'card/CHANGE-MODAL-STATUS':
      return { ...state, [action.modalName]: action.value }
    default:
      return state
  }
}

// actions
export const setCards = (data: GetCardsResponseType) =>
  ({ type: 'card/SET-CARDS', payload: data } as const)
export const setQueryParamsCards = (data: QueryParameterCardsType) =>
  ({ type: 'card/SET-QUERY-PARAMS-CARDS', payload: data } as const)
export const clearCardsState = () => ({ type: 'pack/CLEAR-STATE' } as const)
export const updateCardGrade = (cardID: string, grade: number, shots: number) =>
  ({ type: 'card/UPDATE-CARD-GRADE', cardID, grade, shots } as const)
export const changeCardModalStatus = (
  modalName: 'modalEdit' | 'modalCreate' | 'modalDelete',
  value: boolean
) => ({ type: 'card/CHANGE-MODAL-STATUS', modalName, value } as const)

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
      dispatch(changeCardModalStatus('modalDelete', false))
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
      dispatch(changeCardModalStatus('modalCreate', false))
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
  | ReturnType<typeof updateCardGrade>
  | ReturnType<typeof changeCardModalStatus>

export type InitialStateCardsType = GetCardsResponseType & {
  queryParams: QueryParameterCardsType
  modalEdit?: boolean
  modalCreate?: boolean
  modalDelete?: boolean
}
