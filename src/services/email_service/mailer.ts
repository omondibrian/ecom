import Mailgun from "mailgun-js";
import {config} from 'dotenv';
config();
export interface IMailer {
  sendemail: (from: any, to: any, subject: any, html: any) => Promise<any>;
}

export class Mailer implements IMailer {
  private _apiKey: string = process.env.api;
  private _domain: string = process.env.domain;
  private mailgun: Mailgun.Mailgun;
  constructor() {
    if (!(this._apiKey && this._domain)) {
      throw new Error("Invalid API Keys");
    }
    const mailgunOptions: Mailgun.ConstructorParams = {
      apiKey: this._apiKey,
      domain: this._domain,
    };
    this.mailgun = Mailgun(mailgunOptions);
  }
  async sendemail(from: any, to: any, subject: any, html: any): Promise<any> {
    const res = await this.mailgun
      .messages()
      .send({ to, from, subject, text: html });
      return res;
  }
}
