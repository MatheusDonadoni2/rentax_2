import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../error/AppError';
import { ISpecificationsRepository } from '../../repositories/ISpecificationReposity';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificatioAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificatioAlreadyExists) {
      throw new AppError('Specification already exists.');
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
