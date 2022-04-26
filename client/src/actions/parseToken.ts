import { RoleType } from '../types/types'

export interface ParceTokenInterface {
    id: string,
    login: string,
    role: RoleType
}

export const parseToken = {
    get payload():ParceTokenInterface{
        const regex = /\.\w+\./g
        const token = localStorage.getItem('accessToken')
        const parse = (token.match(regex))[0].replace(/\./g, '')
        return JSON.parse(window.atob(parse))
    }
}