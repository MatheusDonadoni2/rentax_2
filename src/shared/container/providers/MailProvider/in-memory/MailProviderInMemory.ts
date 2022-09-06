import { IMailProvider } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private mesage: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    this.mesage.push(to, subject, variables, path);
  }
}

export { MailProviderInMemory };
