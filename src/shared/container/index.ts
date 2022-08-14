import { container } from 'tsyringe';

import '@shared/container/providers';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesReposytory';
import { ICarsRepository } from '@modules/cars/repositories/ICarsrepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationReposity';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { CarsImagensRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { RentalsRepository } from '@modules/rentals/infra/repositories/RentalsRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagensRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);
