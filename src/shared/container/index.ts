import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesReposytory';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationReposity';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';

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
