import {OPTIONS, SELECT} from '../enum/enum'

export interface PostItemInterface{
    city: string,
    street: string,
    address: string,
    price: string,
    describe?: string,
    images?: string[],
}

export type RentOrBuyType = OPTIONS.BUY | OPTIONS.RENT
export type SelectType = SELECT.ASC | SELECT.DESC | SELECT.START | SELECT.END  

export interface FilterInterface{
    street: null | string,
    price: {toPrice: string, fromPrice: string},
    rentOrBuy: RentOrBuyType[],
    select: SelectType
}