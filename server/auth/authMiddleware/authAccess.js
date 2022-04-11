import authTokenService from '../authService/authTokenService.js'
import ErrorsApi from '../../errorsServer/errorsApi.js'

export default async function authAccess(req, res, next) {

    try {

        const accessToken = req.headers.authorization

        const accessValidToken = await authTokenService.validateAccessToken(accessToken)

        if (!accessValidToken) {
            return next(ErrorsApi.unAuthorization())
        }

        next()

    } catch (error) {
        next(error)
    }



}