// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
import { Stripe } from "stripe";
require('dotenv').config();

export class StripePayment {
  private stripe: Stripe;
  private account: Stripe.Response<Stripe.Account>;

  public refresh_url: string;
  public return_url: string;

  constructor(private readonly origin: string) {
    this.stripe = new Stripe(process.env.stripe_secrete_key, {
      apiVersion: "2020-08-27",
    });
  }
  //create an account for the user using the express connect-workflow
  private async genAccount(options: { email?: string; country?: string }) {
    this.account = await this.stripe.accounts.create({
      type: "express",
      email: options.email,
      country: options.country,
      default_currency: "Kes",
    });
  }
  //generate an account link
  public async generateAccountLink(options: {
    email?: string;
    country?: string;
  }): Promise<string> {
    this.genAccount(options);
    if (!(this.refresh_url && this.return_url))
      throw new Error(
        "make sure your refresh_url and return_url are initalised"
      );

    return this.stripe.accountLinks
      .create({
        type: "account_onboarding",
        account: this.account.id,
        refresh_url: `${this.origin}/${this.refresh_url}`,
        return_url: `${this.origin}/${this.return_url}`,
      })
      .then((link) => link.url);
  }
}
