import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProviders';
import { DayjsDateProvider } from './DateProvider/implementations/DaysjsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);
