//const initialState: ProfileType = {} as ProfileType
//reducer
export const profileReducer = (state: ProfileType = {} as ProfileType, action: ProfileActionsType): ProfileType => {
    switch (action.type) {
        case "UPDATE-PROFILE":
            return {...state, ...action.updatedProfile}
        case "SET-PROFILE": {
            return action.profile
        }
        default:
            return state
    }
}

// action creators
export const updateProfileAC = (id: string, updatedProfile: UpdatedProfileType) => {
    return {type: 'UPDATE-PROFILE', id, updatedProfile} as const
}
export const setProfileAC = (profile: ProfileType) => {
    return {type: 'SET-PROFILE', profile,} as const
}

//types
export type ProfileActionsType =
    ReturnType<typeof updateProfileAC>
    | ReturnType<typeof setProfileAC>

type UpdatedProfileType = {
    fierstName: string
    secondName: string
    adress: AdressType
    foto: Fototype
}

type ProfileType = UpdatedProfileType | { id: string }

type AdressType = {
    country: string
    city: string
}

type Fototype = {
    small: string
    large: string
}

