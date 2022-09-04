import { CardType } from '../cards/cardsAPI'
import { PackType } from '../packs/packAPI'

const initialState: InitialStateLearnType = {} as InitialStateLearnType

export const learnReducer = (
  state: InitialStateLearnType = initialState,
  action: LearnActionsType
): InitialStateLearnType => {
  switch (action.type) {
    case 'learn/SET-PACK':
      return { ...state, cards: [...action.payload] }

    default:
      return state
  }
}

// actions
export const setCards = (data: CardType[]) => ({ type: 'learn/SET-PACK', payload: data } as const)
//
// export const setQueryParams = (data: QueryParameterPackType) =>
//   ({ type: 'pack/SET-QUERY-PARAMS', payload: data } as const)

// thunks
// export const loadPacks =
//   (param: QueryParameterPackType): AppThunk =>
//   async dispatch => {
//     try {
//       dispatch(setStatusLoading('loading'))
//       const res = await packAPI.getPacks(param)
//
//       dispatch(setPacks(res.data))
//       dispatch(setStatusLoading('succeeded'))
//     } catch (e) {
//       handleError(e, dispatch)
//     }
//   }
//
// export const updatePack =
//   (updatedPack: UpdatedPackType): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setStatusLoading('loading'))
//       await packAPI.updatePack(updatedPack)
//       const param = getState().pack.queryParams
//       const res = await packAPI.getPacks(param ? param : {})
//
//       dispatch(setPacks(res.data))
//       dispatch(setStatusLoading('succeeded'))
//     } catch (e) {
//       handleError(e, dispatch)
//     }
//   }
//
// export const deletePack =
//   (idPack: string): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setStatusLoading('loading'))
//       await packAPI.deletePack(idPack)
//       const param = getState().pack.queryParams
//       const res = await packAPI.getPacks(param ? param : {})
//
//       dispatch(setPacks(res.data))
//       dispatch(setStatusLoading('succeeded'))
//     } catch (e) {
//       handleError(e, dispatch)
//     }
//   }
//
// export const createPack =
//   (newPack: NewPackType): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setStatusLoading('loading'))
//       await packAPI.createPack(newPack)
//       const param = getState().pack.queryParams
//       const res = await packAPI.getPacks(param ? param : {})
//
//       dispatch(setPacks(res.data))
//       dispatch(setStatusLoading('succeeded'))
//     } catch (e) {
//       handleError(e, dispatch)
//     }
//   }

// types
export type LearnActionsType = ReturnType<typeof setCards>

export type InitialStateLearnType = {
  cards: CardType[]
}
