import { CreateCarUseCase } from '@modules/cars//useCases/createCars/CreateCarUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 100,
      brand: 'Brand',
      category_id: '1',
    });
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Name Car 1',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 100,
      brand: 'Brand',
      category_id: '1',
    });
    await expect(
      createCarUseCase.execute({
        name: 'Name Car 2',
        description: 'Description',
        daily_rate: 100,
        license_plate: 'abc-1234',
        fine_amount: 100,
        brand: 'Brand',
        category_id: '1',
      }),
    ).rejects.toEqual(new AppError('Car already exists.'));
  });

  it('should be able to create a car with avaible tru by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car Avaiable',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'xxx-1212',
      fine_amount: 100,
      brand: 'Brand',
      category_id: '1',
    });

    expect(car.available).toBe(true);
  });
});
