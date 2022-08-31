import { toast } from 'react-toastify'

import { setStatusLoading } from '../../app/appStatusReducer'
import { AppThunk } from '../../app/store'
import { handleError } from '../../common/utils/handleError'

import {
  GetPacksResponseType,
  NewPackType,
  packAPI,
  PackType,
  QueryParameterPackType,
  UpdatedPackType,
} from './packAPI'

const initialState: InitialStatePackType = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
  queryParams: {} as QueryParameterPackType,
} as InitialStatePackType

export const packsReducer = (
  state: InitialStatePackType = initialState,
  action: PacksActionsType
): InitialStatePackType => {
  switch (action.type) {
    case 'pack/SET-PACKS':
      return {
        ...state,
        ...action.payload,
        cardPacks: [...action.payload.cardPacks],
      }
    //   cardPacksTotalCount: action.payload.cardPacksTotalCount,
    //   maxCardsCount: action.payload.maxCardsCount,
    //   minCardsCount: action.payload.minCardsCount,
    //   page: action.payload.page,
    //   pageCount: action.payload.pageCount,
    // }
    case 'pack/SET-QUERY-PARAMS': {
      const testQuery = { ...state.queryParams, ...action.payload }

      toast.info(JSON.stringify(testQuery))

      return { ...state, queryParams: { ...state.queryParams, ...action.payload } }
    }
    default:
      return state
  }
}

// actions
export const setPacks = (data: InitialStatePackType) =>
  ({ type: 'pack/SET-PACKS', payload: data } as const)
export const setQueryParams = (data: QueryParameterPackType) =>
  ({ type: 'pack/SET-QUERY-PARAMS', payload: data } as const)

// thunks

export const loadPacks =
  (param: QueryParameterPackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      const res = await packAPI.getPacks(param)

      dispatch(setPacks(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const updatePack =
  (updatedPack: UpdatedPackType, param: QueryParameterPackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await packAPI.updatePack(updatedPack)
      const res = await packAPI.getPacks(param)

      dispatch(setPacks(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const deletePack =
  (idPack: string, param: QueryParameterPackType = {}): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await packAPI.deletePack(idPack)
      const res = await packAPI.getPacks(param)

      dispatch(setPacks(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const createPack =
  (newPack: NewPackType, param: QueryParameterPackType = {}): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      await packAPI.createPack(newPack)
      const res = await packAPI.getPacks(param)

      dispatch(setPacks(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }
// types
export type PacksActionsType = ReturnType<typeof setPacks> | ReturnType<typeof setQueryParams>

export type InitialStatePackType = GetPacksResponseType & {
  queryParams?: QueryParameterPackType
}
