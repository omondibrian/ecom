import { Mailer } from "../../../../services/email_service/mailer";

describe("Mailer", () => {
  const mailer = new Mailer();
  describe("Mailer.sendemail()", () => {
    it("should successfully send email to the reciepient  email address", async () => {
      const res = await mailer.sendemail(
        "noreply@api.ojaydev.net",
        "omondibrian392@gmail.com",
        "testing",
        "test test test"
      );
      console.log(res);
      expect(res).toBeInstanceOf<{ id?: string; message: string }>({
        message: "Queued. Thank you.",
      });
    }, 30000);
  });
});
