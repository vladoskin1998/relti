import { Router } from 'express'
import MailController from '../mailController/mailController.js'
import authUserRole from '../../auth/authMiddleware/authUserRole.js'

const mailRouter = new Router()

mailRouter.post('/send', authUserRole(["ADMIN", "USER"]), MailController.sendUserMail)

mailRouter.post('/change-password', MailController.sendChangePassword)

export default mailRouter