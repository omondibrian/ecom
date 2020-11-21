export interface IMailer {
  sendemail: (from: any, to: any, subject: any, html: any) => Promise<any>;
}

