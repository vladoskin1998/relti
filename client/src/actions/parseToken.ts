import { RoleType } from '../types/types'

export interface ParseTokenInterface {
    id: string,
    login: string,
    role: RoleType
}

export const parseToken = {
    payload(accessToken?: string): ParseTokenInterface | null {
        if (!accessToken) {
            return null
        }
        const regex = /\.\w+\./g
        const parse = (accessToken.match(regex))[0].replace(/\./g, '')
        return JSON.parse(window.atob(parse))
    }
}