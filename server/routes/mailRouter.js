import { Router } from 'express'
import MailController from '../controler/mailController.js'
import authUserRole from '../midlleware-server/authUserRole.js'

const mailRouter = new Router()

mailRouter.post('/send', authUserRole(["ADMIN", "USER"]), MailController.sendUserMail)

mailRouter.post('/change-password', MailController.sendChangePassword)

export default mailRouter