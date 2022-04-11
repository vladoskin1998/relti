import authTokenService from '../authService/authTokenService.js'
import User from '../authModels/user.js'
import ErrorsApi from '../../errorsServer/errorsApi.js'

export default function authUserRole(roles) {
    return async function (req, res, next) {

        const accessToken = req.headers.authorization
        const accessValidToken = await authTokenService.validateAccessToken(accessToken)

        if (!accessValidToken) {
            return next(ErrorsApi.unAuthorization())
        }

        const id = accessValidToken.id
        const user = await User.findById(id)

        const accessRole = false

        roles.forEach(role => {
            if (user.roles.includes(role)) {
                accessRole = true
            }
        });

        if (!accessRole) {
            return next(ErrorsApi.badRequest("Forbidden", 403))
        }

        next()

    }
}