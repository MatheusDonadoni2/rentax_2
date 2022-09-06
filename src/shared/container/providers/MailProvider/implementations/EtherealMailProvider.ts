import { injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars, { template } from 'handlebars';
import fs from 'fs';

import { IMailProvider } from '../IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const trasporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = trasporter;
      })
      .catch(err => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const tempĺateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(tempĺateFileContent);
    const templateHTML = templateParse(variables);

    const mesagem = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentax.com.br>',
      subject,
      html: templateHTML,
    });
    console.log(mesagem);
    console.log('Mensagem sent: %s', mesagem.mensageId);
    console.log('preview URL: %s', nodemailer.getTestMessageUrl(mesagem));
  }
}

export { EtherealMailProvider };
