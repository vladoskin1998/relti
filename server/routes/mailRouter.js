import { Router } from 'express'
import MailController from '../controller/mailController.js'
import authUserRole from '../midlleware-server/authUserRole.js'

const MailRouter = new Router()

MailRouter.post('/send', authUserRole(["ADMIN", "USER"]), MailController.sendUserMail)

MailRouter.post('/change-password', MailController.sendChangePassword)

export default MailRouter