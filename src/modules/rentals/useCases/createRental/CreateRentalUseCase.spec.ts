import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in=memory/RentalRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DaysjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let dayJsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Teste',
      description: 'Car Teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '1',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there another open to the same user', async () => {
    const car = await rentalRepositoryInMemory.create({
      car_id: '13',
      expected_return_date: dayAdd24Hours,
      user_id: '2',
    });
    await expect(
      createRentalUseCase.execute({
        user_id: '2',
        car_id: '3',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user."));
  });

  it('should not be able to create a new rental if there another open to the same car', async () => {
    await rentalRepositoryInMemory.create({
      car_id: '3',
      expected_return_date: dayAdd24Hours,
      user_id: '2',
    });
    await expect(
      createRentalUseCase.execute({
        user_id: '4',
        car_id: '3',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable.'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '4',
        car_id: '5',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time.'));
  });
});
