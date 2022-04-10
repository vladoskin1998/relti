import authTokenService from '../authService/authTokenService.js'

export default async function authAccess(req, res, next) {

    try {

        const accessToken = req.headers.authorization

        const accessValidToken = await authTokenService.validateAccessToken(accessToken)

        if (!accessValidToken) {
            return res.status(401).json("Не валиден аксес токен")
        }

        next()

    } catch (error) {
        console.log(error)
    }



}