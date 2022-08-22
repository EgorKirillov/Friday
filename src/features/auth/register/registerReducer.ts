import {Dispatch} from 'redux';
import {authAPI} from './registeAPI';

const initialState: InitialStateType = {
    isRegistered: false
}

export const registerReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTER': {
            return {...state, isRegistered: action.isRegistered}
        }
        default: {
            return state
        }
    }
};


export const registerAC = (isRegistered: boolean) => ({type: 'REGISTER', isRegistered} as const)

// thunks
export const registerTC = (data:any) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(registerAC(true))
    authAPI.register(data)
        .then((res) => {
            if (!res.data.error) {
                dispatch(registerAC(true))

            }
        })
        .catch((error) => {
            dispatch(registerAC(false))
            {error.message ? error.message : 'Some error occurred'}

        })
}

// types
type InitialStateType = {
    isRegistered: boolean
}
export type RegisterActionType = ReturnType<typeof registerAC>;

type ActionsType = RegisterActionType

export type RegisterParamsType = {
    addedUser: {
        email: string
        password: string
    }
    error?: string;
}