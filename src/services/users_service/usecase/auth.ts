import { IAuthserviceUtilities } from "../../serviceUtility";
import { IMailer } from "../../email_service/mailer";

export default class AuthenticationUsecase {
  constructor(
    private readonly repository: UsersService.IUserRepository,
    private readonly utilities: IAuthserviceUtilities,
    private readonly jwt: any,
    private readonly bcrypt: any,
    private readonly generate: any,
    private readonly mailer: IMailer
  ) {}

  //TODO:catch execeptions in the main user's service route
  async logInUser(credentials: UsersService.UserCredentials) {
    //validate the user input
    const { error } = this.utilities.loginValidation(credentials);
    if (error) throw new TypeError(`${error.details[0].message}`);
    //check if the email or phoneNumber passed exists doesn't exists
    const user = await this.repository.findUser({
      email: credentials.email,
      phone_number: credentials.phoneNumber,
    });
    // if (!user) throw new Error("Error authenticating please try again !");
    //check if password is correct
    const validPass = await this.bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!validPass) throw new Error("Error authenticating please try again !");

    //todo:check if account is active

    //create and assign an authentification token
    const token = this.jwt.sign({ _id: user._id }, process.env.SECREATE_TOKEN);
    //TODO:add "AUTH_TOKEN" header and token value to the response custom header
    return { _id: user._id + "", token };
  }

  async registeruser(newUser: UsersService.IUserModel) {
    //validate the user input
    const { error } = this.utilities.registrationValidation(newUser);
    if (error) throw new TypeError(`${error.details[0].message}`);

    //check if the email and phoneNumber already exists
    const [emailExists, phoneNumber] = await Promise.all([
      this.repository.findUser({ email: newUser.email }),
      this.repository.findUser({ phone_number: newUser.phoneNumber }),
    ]);
    if (emailExists) throw new Error("email already exists");
    if (phoneNumber) throw new Error("phoneNumber already exists");
    //encrpte the password

    const encrptedPass = await this.bcrypt.hash(newUser.password, 10);
    //generate a random string
    /**@constant */
    const secreateToken = this.generate();
    //flag the account as inactive
    //create a new user
    try {
      const imageName = Date.now() + " " + newUser.profilePic;
      const image = `/uploads/${encodeURIComponent(imageName)}`;
      const user: UsersService.UserEntity = await this.repository.saveUser({
        ...newUser,
        password: encrptedPass,
        profilePic: image,
      });

      return {
        message: "registration sucessfull",
        token: secreateToken,
        _id: user._id + "",
      };
    } catch (error) {
      throw new Error(`${{ message: "registration unsucessfull", error }}`);
    }
  }

  async forgotPass(credentials: UsersService.UserCredentials) {
    const { email } = credentials;
    const secreateToken = this.generate(7);
    //encrpte the password
    const salt = await this.bcrypt.genSalt(10);
    const encrptedPass = await this.bcrypt.hash(secreateToken, salt);
    await this.repository.UpdateUserField({
      options: { email },
      updateParam: { field: "email", value: encrptedPass },
    });
    const user = await this.repository.findUser({ email: email });
    //compose an email
    const html = `
        Hello ${user.name},<br/>
        please enter the verification code below to acess your account
        please enter the following token<br/>
        Token:${secreateToken}<br/>
        Have a nice day.
        `;
    //send the email
    await this.mailer.sendemail(user, email, "Password Reset Request", html);
    return {
      message: "password changed successfully please check your email",
      secreateToken,
    };
  }
}
