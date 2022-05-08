import nodemailer from 'nodemailer'
import { ADMIN_MAIL, ADMIN_MAIL_PASS } from '../../conf.js';
import User from '../../model-user/user.js'
import ErrorsApi from '../../errors-server/errorsApi.js'
import bcrypt from 'bcrypt'

class MailService {

    async send(link, { message }, file) {

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

            let mail = {
                from: `"Natali Relti" <${ADMIN_MAIL}>`, // sender address
                to: link, // list of receivers
                subject: "client", // Subject line
                text: message, // plain text body
            }

            if (file) {
                mail.attachments = { filename: "file", content: file.file.data }
            }

            let info = await transporter.sendMail(mail);
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return
        } catch (error) {
            console.log(error)
        }
    }

    async sendChangePassword({ login, password }) {

        try {
            const user = await User.findOne({ login })

            if (!user) {
                throw ErrorsApi.badRequest("ERROR_LOG", 400)
            }
    
            const newPassword = bcrypt.hashSync(password, 4)
    
            console.log(`Send for change password ${process.env.SERVER_ADDRESS_NAME}api/auth/change-password?login=${login}&password=${newPassword}`)
    
            await this.send(
                process.env.WORK_MAIL,
                {
                    message: `Send for change password ${process.env.SERVER_ADDRESS_NAME}api/auth/change-password?login=${login}&password=${newPassword}`
                }
            )
        } catch (error) {
            console.log(error);
        }
       
    }
}

export default new MailService()




