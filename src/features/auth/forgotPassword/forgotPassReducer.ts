const initialState = {
  isLoading: false,
  success: false,
  error: '',
}

export const forgotPassReducer = (
  state: InitialStateType = initialState,
  action: ForgotPasswordActionsType
): InitialStateType => {
  switch (action.type) {
    case 'forgotPass/SET-IS-LOADING':
      return { ...state, isLoading: action.isLoading }
    case 'forgotPass/SET-SUCCESS':
      return { ...state, success: action.success }
    case 'forgotPass/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}

// actions
export const setIsLoading = (isLoading: boolean) =>
  ({ type: 'forgotPass/SET-IS-LOADING', isLoading } as const)
export const setSuccess = (success: boolean) =>
  ({ type: 'forgotPass/SET-SUCCESS', success } as const)
export const setError = (error: string) => ({ type: 'forgotPass/SET-ERROR', error } as const)

// thunks

// types
type SetIsLoadingType = ReturnType<typeof setIsLoading>
type SetSuccessType = ReturnType<typeof setSuccess>
type SetErrorType = ReturnType<typeof setError>

type ForgotPasswordActionsType = SetIsLoadingType | SetSuccessType | SetErrorType
type InitialStateType = typeof initialState
