import MailService from '../mailService/mailService.js'

class MailController {

    async send(req, res){

       // console.log(req.files)
        await MailService.send(req.body, req.files)
        return res.json("SEND")


    }
}

export default new MailController()