import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string,
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      ut => ut.user_id === user_id && ut.refresh_token === token, // o nome desta variavél deveria ser refres_token mas to com preguiça de arrumar
    );
    return userToken;
  }

  async deleteByid(id: string): Promise<void> {
    const userToken = this.usersTokens.find(ut => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      ut => ut.refresh_token === refresh_token,
    );
    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
