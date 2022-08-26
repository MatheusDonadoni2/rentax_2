import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '../entities/UserTokens';

interface IUsersTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    token: string,
  ): Promise<UserTokens>;

  deleteByid(id: string): Promise<void>;
}

export { IUsersTokenRepository };
