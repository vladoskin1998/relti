import { PostItemInterface } from '../types/types'
import { OPTIONS, SELECT, CURRENCY } from '../enum/enum'

const initState: PostItemInterface = {
    city: '',
    street: '',
    address: '',
    price: '',
    currency: CURRENCY.UAH,
    rentOrBuy: OPTIONS.RENT,
    describe: '',
}

export const AddPost = (state = initState, action: { type: string, payload: any }): PostItemInterface => {
    switch (action.type) {
        case "AP__CITY":
            state = { ...state, city: action.payload }
            return state
        case "AP__STREET":
            state = { ...state, street: action.payload }
            return state
        case "AP__ADDRESS":
            state = { ...state, address: action.payload }
            return state
        case "AP__PRICE":
            state = { ...state, price: action.payload }
            return state
        case "AP__CURRENCY":
            state = { ...state, currency: action.payload }
            return state
        case "AP_RENTORBUY":
            state = { ...state, rentOrBuy: action.payload }
            return state
        case "AP_DESCRIBE":
            state = { ...state, describe: action.payload }
            return state
        case "AP_INIT":
            state = {...initState}
            return state
        default:
            return initState;
    }
}