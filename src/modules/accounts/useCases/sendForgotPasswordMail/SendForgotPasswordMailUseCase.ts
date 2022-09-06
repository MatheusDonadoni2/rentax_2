import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

import { AppError } from '@shared/errors/AppError';
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProviders';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { template } from 'handlebars';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const expires_date = this.dateProvider.addHours(3);
    const token = uuidv4();
    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    );
  }
}
export { SendForgotPasswordMailUseCase };
