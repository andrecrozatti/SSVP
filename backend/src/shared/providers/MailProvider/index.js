const nodemailer = require('nodemailer');

class MailProvider {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.MAIL_SMTP,
      port: process.env.MAIL_SMTP_PORT,
      auth: {
        user: process.env.MAIL_USER, // Substitua pelo seu usuário Mailtrap "subistituida"
        pass: process.env.MAIL_PASS, // Substitua pela sua senha Mailtrap "subistituida"
      },
    });
  }

  async sendMail({ template, to, subject }) {
    await this.transport.sendMail({
      from: 'NoReply <naoresponda@ssvpdigital.com.br>',
      to,
      subject,
      html: template,
    });
  }
}

module.exports = MailProvider;
