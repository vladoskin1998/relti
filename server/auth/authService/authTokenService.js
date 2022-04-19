import jwt from 'jsonwebtoken'
import { SECRET_REFRESH_KEY } from '../../conf.js'
import { SECRET_ACCESS_KEY } from '../../conf.js'
import Token from '../authModels/token.js'

class AuthTokenService {

    async generateToken(login, id) {

        try {
            const refreshToken = jwt.sign({ login, id }, SECRET_REFRESH_KEY, { expiresIn: 90 })
            const accessToken = jwt.sign({ login, id }, SECRET_ACCESS_KEY, { expiresIn: 30 })
            return { refreshToken, accessToken }
        } catch (error) {
            console.log(error.message)
        }

    }

    async saveToken(refreshToken, id) {

        const token = await Token.findById(id)

        if (token) {
            await token.updateOne({ refreshToken })
            return
        }

        const newToken = await new Token({ refreshToken, user: id })
        await newToken.save()
        return
    }

    async validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, SECRET_REFRESH_KEY)
        } catch (error) {
            console.log(error.message)
        }
    }

    async validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, SECRET_ACCESS_KEY)
        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteToken(refreshToken) {

        await Token.findOneAndDelete(refreshToken)
        return

    }
}

export default new AuthTokenService()