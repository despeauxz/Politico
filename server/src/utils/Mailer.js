import nodemailer from 'nodemailer';
import { getMaxListeners } from 'cluster';


class Mailer {
    
    static sendMail({ to, subject, message }) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: '"Politico" <malikberwy@gmail.com>',
            to,
            cc: 'malikberwy@getMaxListeners.com',
            subject,
            html: message,
        };

        transporter.sendMail(mailOptions);
    }
}