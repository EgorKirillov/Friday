import { setStatusLoading } from '../../../app/appStatusReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../common/utils/handleError'

import { ChangeProfileDataType, profileAPI, ProfileType } from './profileAPI'

const initialState = {} as ProfileType

export const profileReducer = (
  state: ProfileType = initialState,
  action: ProfileActionsType
): ProfileType => {
  switch (action.type) {
    case 'profile/SET-USER':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

// actions
export const setUser = (data: ProfileType) => {
  return { type: 'profile/SET-USER', payload: data } as const
}

// thunks
export const updateProfile =
  (data: ChangeProfileDataType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      const res = await profileAPI.update(data)

      dispatch(setUser(res.data.updatedUser))
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setStatusLoading('idle'))
    }
  }

// types
export type ProfileActionsType = ReturnType<typeof setUser>
