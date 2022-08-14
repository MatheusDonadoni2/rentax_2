import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProviders';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_data_utc = this.convertToUTC(end_date);
    const start_data_utc = this.convertToUTC(start_date);
    const in_day = dayjs(end_data_utc).diff(start_data_utc, 'day');
    const in_days = dayjs(end_data_utc).diff(start_data_utc, 'days');

    console.log(`Test - in day :${in_day}; in days :${in_days}`);

    return dayjs(end_data_utc).diff(start_data_utc, 'days');
  }
}

export { DayjsDateProvider };
