export interface AuthInterface {
    accessToken: string
}

const initState: AuthInterface = {
    accessToken: ''
}

export const AuthReducer = (state = initState, action: { type: string, payload: any }): AuthInterface => {
    switch (action.type) {
        case "AUTH_UPDATE":
            localStorage.setItem('accessToken', action.payload)
            state = { ...state, accessToken: action.payload }
            return state
        case "AUTH_DELETE":
            localStorage.removeItem('accessToken')
            state = { ...state, accessToken: '' }
            return state
        default:
            return state
    }
}

