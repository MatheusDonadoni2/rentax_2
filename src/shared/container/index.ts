import { container } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesReposytory';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationReposity';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';

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
