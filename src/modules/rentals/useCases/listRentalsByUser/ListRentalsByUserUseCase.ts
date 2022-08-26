import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private reantalsRepository: IRentalsRepository,
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.reantalsRepository.findByUser(user_id);
    return rentalsByUser;
  }
}

export { ListRentalByUserUseCase };
