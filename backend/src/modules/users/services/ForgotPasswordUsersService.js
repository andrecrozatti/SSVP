const crypto = require('crypto');

const AppError = require('../../../shared/errors/AppError');

const {
  forgotPassword,
} = require('../../../shared/providers/MailProvider/templates');

class ForgotPasswordUsersService {
  constructor(usersRepository, mailProvider) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
  }

  async execute({ email }) {
    const users = await this.usersRepository.checkUsersEmail(email);

    if (!users) {
      throw new AppError('Users not found ');
    }

    const token = parseInt(crypto.randomBytes(3).toString('hex'), 16)
      .toString()
      .substring(0, 6);

    const data = {
      users_id: users.id,
      token,
    };
    const forgot = await this.usersRepository.saveTokenInDb(data);

    const message = forgotPassword(users.name, token);

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Esqueci minha senha [Ally]',
      template: message,
    });
    return forgot[0];
  }
}

module.exports = ForgotPasswordUsersService;
