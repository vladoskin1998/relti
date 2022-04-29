import { Router } from 'express'
import MailController from '../mailController/mailController.js'

const mailRouter = new Router()

mailRouter.post('/send', MailController.send)

export default mailRouter