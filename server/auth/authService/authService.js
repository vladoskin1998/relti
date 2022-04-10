import User from '../authModels/user.js'
import bcrypt from 'bcrypt'
import AuthTokenService from './authTokenService.js'
import Token from '../authModels/token.js'

class AuthService {
    async registration({ login, password }) {

        const checkUserDb = await User.findOne({ login })

        if (checkUserDb) {
            return
        }

        const hashPass = await bcrypt.hash(password, 5)

        const user = await new User({ login, password: hashPass })
        await user.save()

        const genTokens = await AuthTokenService.generateToken(login, user._id)

        await AuthTokenService.saveToken(genTokens.refreshToken, user._id)

        return { ...genTokens, login, id: user._id }

    }
    async login({ login, password }) {

        const user = await User.findOne({ login })

        if (!user) return

        const checkPass = await bcrypt.compare(password, user.password)

        if (!checkPass) return

        const genTokens = await AuthTokenService.generateToken(login, user._id)

        await AuthTokenService.saveToken(genTokens.refreshToken, user._id)

        return { ...genTokens, login, id: user._id }

    }

    async refresh(refreshToken) {

        const token = await Token.findOne({ refreshToken })
        if (!token) {
            return
        }

        const validRefToken = await AuthTokenService.validateRefreshToken(refreshToken)
        if (!validRefToken) {
            return
        }

        const userID = token.user
        const user = await User.findOne({ userID })

        const genTokens = await AuthTokenService.generateToken(user.login, user._id)

        await AuthTokenService.saveToken(genTokens.refreshToken, user._id)

        return { ...genTokens, login: user.login, id: user._id }
    }

    async logout(refreshToken) {

        await AuthTokenService.deleteToken(refreshToken)
        return

    }
}

export default new AuthService()