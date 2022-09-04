import { CardType } from '../cards/cardsAPI'

const initialState: InitialStateLearnType = {
  card: {} as CardType,
  cardGradeIsComplite: false,
}

export const learnReducer = (
  state: InitialStateLearnType = initialState,
  action: LearnActionsType
): InitialStateLearnType => {
  switch (action.type) {
    case 'learn/SET-CARD':
      return { ...state, card: { ...action.payload } }
    case 'learn/SET-CARD-GRADE-IS-COMPLITE':
      return { ...state, cardGradeIsComplite: action.cardGradeIsComplite }
    default:
      return state
  }
}

// actions
export const setCard = (data: CardType) => ({ type: 'learn/SET-CARD', payload: data } as const)
export const setLearningComplite = (cardGradeIsComplite: boolean) =>
  ({ type: 'learn/SET-CARD-GRADE-IS-COMPLITE', cardGradeIsComplite } as const)

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
export type LearnActionsType = ReturnType<typeof setCard> | ReturnType<typeof setLearningComplite>

export type InitialStateLearnType = {
  card: CardType
  cardGradeIsComplite: boolean
}
