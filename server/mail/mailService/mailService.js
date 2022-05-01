import nodemailer from 'nodemailer'

class MailService {

    async send({message}, file) {

        try {

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'natalirelti@gmail.com', // generated ethereal user
                    pass: 'Vlados1998', // generated ethereal password
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




