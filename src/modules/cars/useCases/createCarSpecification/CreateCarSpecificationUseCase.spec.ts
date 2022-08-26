import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificatiosRepositorynInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificatiosRepositotoryInMemory: SpecificationRepositoryInMemory;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificatiosRepositotoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificatiosRepositotoryInMemory,
    );
  });

  it('should not be able to add a new specification to a now-existent car.', async () => {
    const car_id = '12345';
    const specifications_id = ['12345'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      }),
    ).rejects.toEqual(new AppError('Car does not exists.'));
  });

  it('should be able to add a new specification to the car.', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 100,
      brand: 'Brand',
      category_id: '1',
    });

    const specification = await specificatiosRepositotoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
