export interface AuthInterface {
    accessToken: string
}

const initState: AuthInterface = {
    accessToken: '' || localStorage.getItem('accessToken')
}

export const AuthReducer = (state = initState, action: { type: string, payload: any }): AuthInterface => {
    switch (action.type) {
        case "AUTH_UPDATE":
        //    console.log("AUTH_UPDATE",action.payload)
            localStorage.setItem('accessToken', action.payload)
            state = { ...state, accessToken: action.payload }
            return state
        case "AUTH_DELETE":
            localStorage.removeItem('accessToken')
            state = { ...state, accessToken: '' }
        default:
            return initState
    }
}