import nodemailer from 'nodemailer';
import passwordReset from '../templates/passwordReset';

const url = process.env.BASE_URL;
/**
 * Mailer Emmiter
 * @class Mailer
 */
class Mailer {
  /**
   * Sends Mail
   * @method sendMail
   * @param { string } to
   * @param { string } subject
   * @param { string } message
   * @memberof Mailer
   * @returns {void}
   */
  static sendMail({ to, subject, message }) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Politico" <malikberwy@gmail.com>',
      to,
      cc: 'malikberwy@gmail.com',
      subject,
      html: message,
    };

    transporter.sendMail(mailOptions);
  }

  /**
    * Sends Mail for user to use to reset his password
    * @method forgotPasswordMail
    * @memberof Mailer
    * @param {string} token
    * @param {string} emailAddress
    * @returns {void}
    */
  static forgotPasswordMail(token, email) {
    const message = passwordReset(url, token, email);

    return Mailer.sendMail({
      to: email,
      subject: 'Politico: Reset Password',
      message,
    });
  }
}

export default Mailer;
