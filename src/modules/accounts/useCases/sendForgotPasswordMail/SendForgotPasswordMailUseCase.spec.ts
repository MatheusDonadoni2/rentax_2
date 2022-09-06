import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRespositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DaysjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot mail', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail user', async () => {
    const sendEmail = jest.spyOn(mailProvider, 'sendMail');

    await userRepositoryInMemory.create({
      driver_license: '715253',
      email: 'wowas@is.ki',
      name: 'Hettie Johnson',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('wowas@is.ki');

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('al@poz.il'),
    ).rejects.toEqual(new AppError('User does not exists.'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenEmail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    );
    await userRepositoryInMemory.create({
      driver_license: '731452',
      email: 'palsi@fesho.sb',
      name: 'Belle Castillo',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('palsi@fesho.sb');

    expect(generateTokenEmail).toHaveBeenCalled();
  });
});
