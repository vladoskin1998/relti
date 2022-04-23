
const initState: boolean = false

export const LoaderChange = (state = initState, action: { type: string, payload: any }):boolean => {
    switch (action.type) {
        case "LOADER":
            state = action.payload
            return state
        default:
            return initState;
    }
}