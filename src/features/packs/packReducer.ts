import { setStatusLoading } from '../../app/appStatusReducer'
import { AppThunk } from '../../app/store'
import { handleError } from '../../common/utils/handleError'

import { packAPI, PackType, UpdatedPackType } from './packAPI'

const initialState = {
  packs: [] as PackType[],
}

export const packsReducer = (
  state: InitialStatePackType = initialState,
  action: PacksActionsType
): InitialStatePackType => {
  switch (action.type) {
    case 'pack/SET-PACKS':
      return { ...state, packs: action.payload }
    default:
      return state
  }
}

// actions
export const setPacks = (data: PackType[]) => {
  return { type: 'pack/SET-PACKS', payload: data } as const
}

// thunks
export const loadPacks = (): AppThunk => async dispatch => {
  try {
    dispatch(setStatusLoading('loading'))
    const res = await packAPI.getPacks()

    dispatch(setPacks(res.data.cardPacks))

    dispatch(setStatusLoading('succeeded'))
  } catch (e) {
    handleError(e, dispatch)
  }
}
export const updatePack =
  (updatedPack: UpdatedPackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      const res = await packAPI.updatePack(updatedPack)

      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

// export const updateProfile =
//   (data: ChangeProfileDataType): AppThunk =>
//   async dispatch => {
//     try {
//       dispatch(setStatusLoading('loading'))
//       const res = await profileAPI.update(data)
//
//       dispatch(setUser(res.data.updatedUser))
//     } catch (e) {
//       handleError(e, dispatch)
//     } finally {
//       dispatch(setStatusLoading('idle'))
//     }
//   }

// types
export type PacksActionsType = ReturnType<typeof setPacks>
export type InitialStatePackType = {
  packs: PackType[]
}
