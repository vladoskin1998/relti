import {OPTIONS, SELECT, ROLE, AUTH, ALERT} from '../enum/enum'
import Location from 'react-router-dom'

export type RoleType = ROLE.ADMIN | ROLE.USER 
export type RentOrBuyType = OPTIONS.BUY | OPTIONS.RENT
export type AlertType = ALERT.ERROR | ALERT.SUCCESS | ALERT.NONE

export interface PostItemInterface{
    _id?: string,
    city: string,
    street: string,
    address: string,
    price: string,
    rentOrBuy: RentOrBuyType,
    describe?: string,
    images?: string[],
}

export type SelectType = SELECT.ASC | SELECT.DESC | SELECT.START | SELECT.END  


export interface FilterInterface{
    street: null | string,
    price: {toPrice: string | null, fromPrice: string | null},
    rentOrBuy: RentOrBuyType[],
    select: SelectType
}


export type authType = AUTH.SINGIN | AUTH.SINGUP

export interface NavigationStateInterface{
    auth: authType,
    from?: Location
}

export type KeyNewPostType = "city" |  "street" | "address" |  "price"

export interface VInputNewPostInterface{
    city: boolean,
    street: boolean,
    address: boolean,
    price: boolean
}