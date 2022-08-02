


//const initialState: LoginType = {} as LoginType
//reducer
export const loginReducer = (state: LoginType = {} as LoginType, action: LoginActionsType): LoginType => {
    switch (action.type) {
        case "DELETE-USER":
            return {...state}
        case "CREATE-NEW-USER": {
            return {...state}
        }
        default:
            return state
    }
}

// action creators
export const deleteUserAC = (email: string, password: string) => {
    return {type: 'DELETE-USER', password,} as const
}
export const createNewUserAC = (email: string, password: string) => {
    return {type: 'CREATE-NEW-USER', password,} as const
}

//types
export type LoginActionsType =
    ReturnType<typeof deleteUserAC>
    | ReturnType<typeof createNewUserAC>

type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}


