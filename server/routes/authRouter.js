import { Router } from 'express'
import controller from '../controler/authController.js'

const authRouter = new Router()

authRouter.post('/registration', controller.registration)

authRouter.post('/login', controller.login)

authRouter.get('/change-password', controller.changePassword)

authRouter.post('/refresh', controller.refresh)

authRouter.post('/logout', controller.logout)

export default authRouter