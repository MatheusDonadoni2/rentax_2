import { inject, injectable } from 'tsyringe';
import { verify, sign } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProviders';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private userTokensRepository: IUsersTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists.');
    }

    await this.userTokensRepository.deleteByid(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
export { RefreshTokenUseCase };
