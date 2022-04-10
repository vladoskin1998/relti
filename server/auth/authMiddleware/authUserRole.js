import authTokenService from '../authService/authTokenService.js'
import User from '../authModels/user.js'

export default function authUserRole(roles) {
    return async function (req, res, next) {

        const accessToken = req.headers.authorization
        const accessValidToken = await authTokenService.validateAccessToken(accessToken)

        if (!accessValidToken) {
            return res.status(401).json("Не валиден аксес токен")
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
            return res.status(403).json("Отказано в доступе")
        }

        next()

    }
}