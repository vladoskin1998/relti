import nodemailer from 'nodemailer'
import { ADMIN_MAIL, ADMIN_MAIL_PASS } from '../../conf.js';

class MailService {

    async send({message}, file) {

        try {

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: ADMIN_MAIL, // generated ethereal user
                    pass: ADMIN_MAIL_PASS, // generated ethereal password
                },
            });
            let info = await transporter.sendMail({
                from: '"Natali Relti" <natalirelti@gmail.com>', // sender address
                to: "vladosik4891@gmail.com", // list of receivers
                subject: "client", // Subject line
                text: message, // plain text body
                attachments: {filename:"file", content: file.file.data},
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return 
        } catch (error) {
            console.log(error)
        }
    }
}

export default new MailService()




