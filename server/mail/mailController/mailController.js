import MailService from '../mailService/mailService.js'

class MailController {

    async send(req, res){
        await MailService(req, res)
        return "SEND"
        
    }
}

export default new MailController()