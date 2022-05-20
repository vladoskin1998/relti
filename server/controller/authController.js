import authService from '../service/authService.js'
import ErrorsApi from '../errors-server/errorsApi.js'
import url from 'url'

class AuthController {

    async registration(req, res, next) {
        try {
            const reg = await authService.registration(req.body)
            res.cookie('refreshToken', reg.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({ accessToken: reg.accessToken })
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {

        try {
            const log = await authService.login(req.body)
            res.cookie('refreshToken', log.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({ accessToken: log.accessToken })
        } catch (error) {
            next(error)
        }


    }

    async changePassword(req, res, next) {

        const query = url.parse(req.url, true).query;
        await authService.changePassword(query)
        return res.json("Ваш пароль успешно изменен, войдите в свой кабинет.")

    }

    async refresh(req, res, next) {

        try {
            const { refreshToken } = req.cookies
            const ref = await authService.refresh(refreshToken)
            console.log("ref", ref)
            res.cookie('refreshToken', ref.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({ accessToken: ref.accessToken })
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {

        try {
            const { refreshToken } = req.cookies
            await authService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return next(ErrorsApi.unAuthorization())
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()

