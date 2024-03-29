import { instanceToInstance as classToClass } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';
import { IUsersResponseDTO } from '../dtos/IUsersResponseDTO';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUsersResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}
export { UserMap };
