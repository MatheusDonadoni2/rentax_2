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
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokensRepository';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './providers/StorageProvider/implementations/S3StorageProvider';

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

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UsersTokenRepository,
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk],
);
