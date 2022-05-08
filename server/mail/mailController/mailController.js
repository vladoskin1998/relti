import MailService from '../mailService/mailService.js'

class MailController {

    async sendUserMail(req, res){

        await MailService.send(process.env.WORK_MAIL, req.body, req.files)
        return res.json("SEND")

    }

    async sendChangePassword(req, res){

        await MailService.sendChangePassword(req.body)
        return res.json("SEND")

    }
}

export default new MailController()