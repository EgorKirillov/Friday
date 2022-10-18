import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'

import { setError, setStatusLoading } from '../../app/appStatusReducer'
import { AppActionType } from '../../app/store'

export const handleError = (error: any, dispatch: Dispatch<AppActionType>) => {
  const err = error as Error | AxiosError<{ error: string }>
  let errorMessage: string

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data ? err.response.data.error : err.message
  } else {
    errorMessage = `Native error ${err.message}`
  }
  if (errorMessage === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
    errorMessage = 'you are not authorized, please login'
  }
  dispatch(setError(errorMessage))
  dispatch(setStatusLoading('failed'))
  toast.error(errorMessage)
}
/*

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
*/
