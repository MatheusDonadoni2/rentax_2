import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersResponseDTO } from '@modules/accounts/dtos/IUsersResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUsersResponseDTO> {
    const user = await this.userRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
