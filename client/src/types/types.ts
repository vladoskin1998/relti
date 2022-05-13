import {OPTIONS, SELECT, ROLE, AUTH, ALERT, CURRENCY, ERRORAUTH} from '../enum/enum'

export type RoleType = ROLE.ADMIN | ROLE.USER 
export type RentOrBuyType = OPTIONS.BUY | OPTIONS.RENT
export type AlertType = ALERT.ERROR | ALERT.SUCCESS | ALERT.NONE
export type CurrencyType = CURRENCY.EUR | CURRENCY.USD | CURRENCY.UAH 
export type ErrorAuthType = ERRORAUTH.LOGIN | ERRORAUTH.PASSWORD

export interface PostItemInterface{
    _id?: string,
    city: string,
    street: string,
    address: string,
    currency: CurrencyType,
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
    select: SelectType,
    currency?: CurrencyType,
}


export type AuthType = AUTH.REGISTRATION | AUTH.LOGIN | AUTH.CHANGE_PASSWORD

export interface NavigationStateInterface{
    auth?: AuthType,
    from?: Location,
    images?: string[]
}

export interface AuthResponseInterface{
    accessToken?: string,
    message?: string,
}

export type KeyNewPostType = "city" |  "street" | "address" |  "price"

export interface VInputNewPostInterface{
    city: boolean,
    street: boolean,
    address: boolean,
    price: boolean
}