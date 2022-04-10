import authService from '../authService/authService.js'

class AuthController {

    async registration(req, res) {

        const reg = await authService.registration(req.body)

        if (!reg?.accessToken) {
            return res.status(404).json("Пользователь уже создан")
        }

        res.cookie('refreshToken', reg.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json({ accessToken: reg.accessToken })

    }

    async login(req, res) {

        const log = await authService.login(req.body)

        if (!log?.accessToken) {
            return res.status(404).json("Не правильный логин или пароль")
        }

        res.cookie('refreshToken', log.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json({ accessToken: log.accessToken })
    }


    async refresh(req, res) {

        const { refreshToken } = req.cookies
        const ref = await authService.refresh(refreshToken)

        if (!ref?.refreshToken) {
            return res.status(401).json("Неавтризован")
        }

        res.cookie('refreshToken', ref.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json({ accessToken: ref.accessToken })
    }

    async logout(req, res) {

        const { refreshToken } = req.cookies
        await authService.logout(refreshToken)
        res.clearCookie("refreshToken")
        return res.status(401).json('Пользователь не авторизован')

    }
}

export default new AuthController()

