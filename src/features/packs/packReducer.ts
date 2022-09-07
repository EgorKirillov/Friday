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
  modalEdit: false,
  modalCreate: false,
  modalDelete: false,
  idEditPack: '',
  oldName: '',
}

export const packsReducer = (
  state: InitialStatePackType = initialState,
  action: PacksActionsType
): InitialStatePackType => {
  switch (action.type) {
    case 'pack/SET-PACKS':
      return { ...state, ...action.payload, cardPacks: [...action.payload.cardPacks] }
    case 'pack/SET-QUERY-PARAMS': {
      return { ...state, queryParams: { ...state.queryParams, ...action.payload } }
    }
    case 'pack/CHANGE-MODAL-STATUS':
      return { ...state, [action.modalName]: action.value }
    case 'pack/SET-PACK-DATA':
      return { ...state, idEditPack: action.idEditPack, oldName: action.oldName }
    default:
      return state
  }
}

// actions
export const setPacks = (data: InitialStatePackType) =>
  ({ type: 'pack/SET-PACKS', payload: data } as const)

export const setQueryParams = (data: QueryParameterPackType) =>
  ({ type: 'pack/SET-QUERY-PARAMS', payload: data } as const)

export const changePackModalStatus = (
  modalName: 'modalEdit' | 'modalCreate' | 'modalDelete',
  value: boolean
) => ({ type: 'pack/CHANGE-MODAL-STATUS', modalName, value } as const)
export const setPackData = (idEditPack: string, oldName: string) =>
  ({ type: 'pack/SET-PACK-DATA', idEditPack, oldName } as const)

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
  (updatedPack: UpdatedPackType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setStatusLoading('loading'))
      await packAPI.updatePack(updatedPack)
      const param = getState().pack.queryParams
      const res = await packAPI.getPacks(param ? param : {})

      dispatch(setPacks(res.data))
      dispatch(changePackModalStatus('modalEdit', false))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const deletePack =
  (idPack: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setStatusLoading('loading'))
      await packAPI.deletePack(idPack)
      const param = getState().pack.queryParams
      const res = await packAPI.getPacks(param ? param : {})

      dispatch(setPacks(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const createPack =
  (newPack: NewPackType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setStatusLoading('loading'))
      await packAPI.createPack(newPack)
      const param = getState().pack.queryParams
      const res = await packAPI.getPacks(param ? param : {})

      dispatch(setPacks(res.data))
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

// types
export type PacksActionsType =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof setQueryParams>
  | ReturnType<typeof changePackModalStatus>
  | ReturnType<typeof setPackData>

export type InitialStatePackType = GetPacksResponseType & {
  queryParams?: QueryParameterPackType
  modalEdit?: boolean
  modalCreate?: boolean
  modalDelete?: boolean
  idEditPack?: string
  oldName?: string
}
