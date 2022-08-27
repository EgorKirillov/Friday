import { Dispatch } from 'redux'

import { setErrorAC } from '../../app/appStatusReducer'
import { AppActionType } from '../../app/store'

// generic function
export const handleServerAppError = <T>(
  data: any, //ResponseType<T>,
  dispatch: Dispatch<AppActionType>
) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]))
  } else {
    dispatch(setErrorAC('Some error occurred'))
  }
  dispatch(setErrorAC('failed'))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<AppActionType>
) => {
  dispatch(setErrorAC(error.message ? error.message : 'some unknown error'))
  dispatch(setErrorAC('failed'))
}
