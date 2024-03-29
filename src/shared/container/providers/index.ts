import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProviders';
import { DayjsDateProvider } from './DateProvider/implementations/DaysjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);
