import jwt from 'jsonwebtoken'
import { SECRET_REFRESH_KEY } from '../conf.js'
import { SECRET_ACCESS_KEY } from '../conf.js'
import Token from '../model/token.js'

class AuthTokenService {

    async generateToken(login, id, role) {

        try {
            const refreshToken = jwt.sign({ login, id }, SECRET_REFRESH_KEY, { expiresIn: "2d" })
            const accessToken = jwt.sign({ login, id, role }, SECRET_ACCESS_KEY, { expiresIn: 300 })
            return { refreshToken, accessToken }
        } catch (error) {
            console.log(error.message)
        }

    }

    async saveToken(refreshToken, id) {

        await Token.findOneAndUpdate({ user: id }, { refreshToken }, {
            new: true,
            upsert: true
        });

        return
    }


    async validateRefreshToken(refreshToken) {
        try {
            //   console.log("refreshToken--->", refreshToken)
            return jwt.verify(refreshToken, SECRET_REFRESH_KEY)
        } catch (error) {
            console.log(error.message)
        }
    }

    async validateAccessToken(accessToken) {
        try {
            // console.log("accessToken--->>", accessToken)
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