import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IRespose {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IRespose> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password incorrect.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect.');
    }

    const token = sign({}, 'daskldhjaskl123j12o3j12p31po', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IRespose = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
