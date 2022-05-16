import { Router } from 'express'
import controller from '../controller/authController.js'

const AuthRouter = new Router()

AuthRouter.post('/registration', controller.registration)

AuthRouter.post('/login', controller.login)

AuthRouter.get('/change-password', controller.changePassword)

AuthRouter.post('/refresh', controller.refresh)

AuthRouter.post('/logout', controller.logout)

export default AuthRouter