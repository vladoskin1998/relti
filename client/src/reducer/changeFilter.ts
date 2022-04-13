import { FilterInterface } from '../types/types'

const initState: FilterInterface = {
    street: null,
    price: null,
    date: null
}

export const changeFilter = (state = initState, action: { type: string, payload: any }):FilterInterface => {
    switch (action.type) {
        case "value":

            return;

        default:
            return initState;
    }
}