import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'CAR_1',
      description: 'CAR_DESCRIPTION',
      daily_rate: 1,
      license_plate: 'XXX-0001',
      fine_amount: 1,
      brand: 'CAR_BRAND',
      category_id: 'CAREGORY_ID',
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'CAR_2',
      description: 'CAR_DESCRIPTION',
      daily_rate: 2,
      license_plate: 'XXX-0002',
      fine_amount: 2,
      brand: 'CAR_BRAND_2',
      category_id: 'CAREGORY_ID_2',
    });
    const cars = await listCarsUseCase.execute({ brand: 'CAR_BRAND_2' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'CAR_3',
      description: 'CAR_DESCRIPTION',
      daily_rate: 3,
      license_plate: 'XXX-0003',
      fine_amount: 3,
      brand: 'CAR_BRAND_3',
      category_id: 'CAREGORY_ID_3',
    });
    const cars = await listCarsUseCase.execute({ name: 'CAR_3' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by caregory_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'CAR_4',
      description: 'CAR_DESCRIPTION',
      daily_rate: 4,
      license_plate: 'XXX-0004',
      fine_amount: 4,
      brand: 'CAR_BRAND_4',
      category_id: 'CAREGORY_ID_4',
    });
    const cars = await listCarsUseCase.execute({
      category_id: 'CAREGORY_ID_4',
    });
    expect(cars).toEqual([car]);
  });
});
