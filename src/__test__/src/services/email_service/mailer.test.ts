import { Mailer } from "../../../../services/email_service/mailer";

describe("Mailer", () => {
  const mailer = new Mailer();
  describe("Mailer.sendemail()", () => {
    const html = `
    Hello test user,<br/>
    please enter the verification code below to acess your account
    please enter the following token<br/>
    Token:1234567890<br/>
    Have a nice day.
    `;
    it("should successfully send email to the reciepient  email address", async () => {
      const res = await mailer.sendemail(
        "noreply@api.ojaydev.net",
        "omondibrian392@gmail.com",
        "testing",
        html
      );
      console.log(res);
      expect(res.message).toEqual({
        message: "Queued. Thank you.",
      });
    }, 30000);
  });
});
