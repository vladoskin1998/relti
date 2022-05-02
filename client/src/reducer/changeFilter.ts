import { FilterInterface } from '../types/types'
import { OPTIONS, SELECT, CURRENCY } from '../enum/enum'

const initState: FilterInterface = {
    street: null,
    price: {toPrice:null, fromPrice:null},
    rentOrBuy: [OPTIONS.BUY, OPTIONS.RENT],
    select: SELECT.END,
    currency: CURRENCY.UAH,
}

export const ChangeFilter = (state = initState, action: { type: string, payload: any }):FilterInterface => {
    switch (action.type) {
        case "F_CHANGE_STREET":
            state={...state, street: action.payload || null }
            return state
        case "F_CHANGE_MINPRICE":
            state={...state, price: {...state.price, toPrice: action.payload || null}}
            return state
        case "F_CHANGE_MAXPRICE": 
            state={...state, price: {...state.price, fromPrice: action.payload || null}}
            return state
        case "F_CHANGE_CURRENCY":
            state={...state, currency: action.payload }
            return state
        case "F_CHANGE_RENTBUY":
            state={...state, 
                rentOrBuy: state.rentOrBuy.includes(action.payload) 
                ? state.rentOrBuy.filter(it => it !== action.payload)
                : [...state.rentOrBuy, action.payload]
            }
            return state
        case "F_CHANGE_SELECT": 
            state={...state, select: action.payload}
            return state
        case "F_CHANGE_DEFAULT":
            state={...initState}
            return state
        default:
            return initState;
    }
}