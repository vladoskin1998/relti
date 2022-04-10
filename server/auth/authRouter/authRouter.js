import { Router } from 'express'
import controller from '../authController/authController.js'

const authRouter = new Router()

authRouter.post('/registration', controller.registration)
authRouter.post('/login', controller.login)
authRouter.post('/refresh', controller.refresh)
authRouter.post('/logout', controller.logout)

export default authRouter