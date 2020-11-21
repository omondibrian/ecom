/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthenticationUsecase from "../../../../../services/users_service/usecase/auth";
import {
  IUser,
  UserCredentials,
} from "../../../../../services/users_service/service_repository";
import { IAuthserviceUtilities } from "../../../../../services/serviceUtility";
import { IMailer } from "../../../../../services/email_service/mailer";
import UsersTestRepository from "../../../../__mocks__/IuserRepo";

class AuthServiceUtilities implements IAuthserviceUtilities {
  loginValidation(
    _entityBody: unknown
  ): { error: { details: { message: string }[] } | false } {
    
    return { error: false };
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registrationValidation(_entityBody: unknown) {}
}
class Mailer implements IMailer {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendemail(_from: unknown, _to: unknown, _subject: unknown, _html: unknown): Promise<unknown> | any {}
}

// const mocked = UsersTestRepository as jest.Mocked<typeof UsersTestRepository>;  // Let TypeScript know mocked is an auto-mock of the module
// const AuthenticationService = mocked.default;  // AuthenticationService has correct TypeScript typing
class Bcrypt {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  compare() {
    return true;
  }
  hash(pass: string) {
    return `pass${pass}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  genSalt(): any {}
}

const testRepo = new UsersTestRepository();
const testUtilities = new AuthServiceUtilities();
const jwt = { sign: () => {} };
const generate = jest.fn(() => "1234567");
const mailer = new Mailer();
const bcrypt = new Bcrypt();
const authService = new AuthenticationUsecase(
  testRepo,
  testUtilities,
  jwt,
  bcrypt,
  generate,
  mailer
);

describe("AuthenticationUsecase", () => {
  beforeEach(() => {
    jest.spyOn(testRepo, "findUser").mockClear();
    jest.spyOn(bcrypt, "hash").mockClear();
    jest.spyOn(testRepo, "saveUser").mockClear();
  });
  const newUser: IUser = {
    name: "testUser",
    password: "test",
    email: "testUser@test.com",
    phoneNumber: "13011999",
    _id: "1",
    Address: "testAddress",
    profilePic: "testpath//test.jpg",
  };

  const userCredentials: UserCredentials = {
    password: "test",
    email: "testUser@test.com",
    phoneNumber: "13011999",
  };

  describe("AuthenticationUsecase.LoginUser()", () => {
    it("should throw an error when passed invalid user credentials", () => {
      const mockLoginValidation = jest.spyOn(testUtilities, "loginValidation");
      mockLoginValidation.mockImplementationOnce(() => {
        return {
          error: {
            details: [
              {
                message: "error while testing",
              },
            ],
          },
        };
      }); // replace the implementation if desired

      //test for test error
      expect(() => authService.logInUser(userCredentials)).rejects.toThrowError(
        new TypeError("error while testing")
      );
      //then check if validate was called once
      expect(testUtilities.loginValidation).toHaveBeenCalledTimes(1);
      mockLoginValidation.mockClear();
    });

    it("should throw an error if an invalid password is passed", () => {
      const mockedBcrypt = jest.spyOn(bcrypt, "compare");
      mockedBcrypt.mockImplementationOnce(() => false);
      expect(() => authService.logInUser(userCredentials)).rejects.toThrowError(
        new Error("Error authenticating please try again !")
      );
      // expect(bcrypt.compare).toHaveBeenCalled();
      mockedBcrypt.mockClear();
    });

    it("should successfully log in an existing user", async () => {
      const mockedBcrypt = jest.spyOn(bcrypt, "compare");
      const mockedjwt = jest.spyOn(jwt, "sign");
      const token = 11127646581635;
      mockedjwt.mockImplementationOnce(() => token);
      const result = await authService.logInUser(userCredentials);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toStrictEqual({ _id: "1", token });
      expect(bcrypt.compare).toHaveBeenCalled();
      mockedBcrypt.mockClear();
      mockedjwt.mockClear();
    });
  });
  describe("AuthenticationUsecase.registeruser()", () => {
    beforeEach(() => {
      const mockregistrationValidation = jest.spyOn(
        testUtilities,
        "registrationValidation"
      );
      mockregistrationValidation.mockImplementationOnce(() => {
        return { error: false };
      });
      const mockFindUser = jest.spyOn(testRepo, "findUser");
      mockFindUser.mockReturnValue(undefined);
    });
    afterEach(()=>{
      const mockregistrationValidation = jest.spyOn(
        testUtilities,
        "registrationValidation"
      );
      mockregistrationValidation.mockReset()
    })

    it("should successfully register new user", async () => {
      const result = await authService.registeruser(newUser);
      expect(testUtilities.registrationValidation).toHaveBeenCalledWith(
        newUser
      );

      expect(testRepo.findUser).toHaveBeenCalledTimes(2);
      jest.spyOn(bcrypt, "hash");
      jest.spyOn(testRepo, "saveUser");
      expect(testRepo.saveUser).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(generate).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual<{
        message: string;
        token: string;
        _id: string;
      }>({ message: "registration sucessfull", token: "1234567", _id: "1" });
    });

    it("should throw TypeError if invalid credentials are passed", () => {
      const mockValidation = jest.spyOn(
        testUtilities,
        "registrationValidation"
      );
      mockValidation.mockImplementationOnce(() => {
        return {
          error: {
            details: [
              {
                message: "testing error",
              },
            ],
          },
        };
      });
      expect(() => authService.registeruser(newUser)).rejects.toThrowError(
        new TypeError("testing error")
      );
      mockValidation.mockClear()
    });

    it("should throw Error if email exists", () => {
      const mockValidation = jest.spyOn(
        testUtilities,
        "registrationValidation"
      );
      mockValidation.mockImplementationOnce(() => {
        return {
          error: false
        };
      });
      jest.spyOn(testRepo, "findUser").mockReturnValue(newUser);
      expect(() => authService.registeruser(newUser)).rejects.toThrowError(
        new Error("email already exists")
      );
      mockValidation.mockClear()
    });

    it("should throw an error if registration is unsuccefull", () => {
      jest.spyOn(testRepo, "saveUser").mockImplementationOnce(() => {
        throw new Error("testError");
      });
      expect(() => authService.registeruser(newUser)).rejects.toThrowError(
        new Error(
          `${{ message: "registration unsucessfull", error: "testError" }}`
        )
      );
    });
  });

  describe("AuthenticationUsecase.forgotPass()", () => {
    const secreateToken = "1234567";
    beforeEach(() => {
      generate.mockReturnValue(secreateToken);
      jest.spyOn(bcrypt, "genSalt").mockReturnValue(1222);
      jest.spyOn(testRepo, "UpdateUserField").mockReturnThis();
      jest
        .spyOn(testRepo, "findUser")
        .mockReturnValue({ ...newUser, password: secreateToken });
      jest.spyOn(mailer, "sendemail").mockReturnThis();
    });

    afterAll(() => {
      jest.spyOn(testRepo, "saveUser").mockClear();
      jest.spyOn(testRepo, "findUser").mockClear();
      jest.spyOn(bcrypt, "genSalt").mockClear();
      jest.spyOn(mailer, "sendemail").mockClear();
      jest.spyOn(testRepo, "UpdateUserField").mockClear();
    });

    it("should successfully reset user password and send resetToken to users email", async () => {
      const result = await authService.forgotPass(userCredentials);

      expect(result).toStrictEqual<{ message: string; secreateToken: string }>({
        message: "password changed successfully please check your email",
        secreateToken,
      });
    });
  });
});
