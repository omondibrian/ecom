import { AuthserviceUtilities } from "../../services/serviceUtility";

describe("AuthserviceUtilities", () => {
  const auth = new AuthserviceUtilities();
  describe("AuthserviceUtilities.loginValidation()", () => {
    it("should successfully validate the user log in credentials", async () => {
      const credentials: UsersService.UserCredentials = {
        email: "testUser@test.com",
        password: "test",
        
      };
      const res = await auth.loginValidation(credentials);
      expect(res.error).toBeFalsy();
    });
  });

  describe("AuthserviceUtilities.registrationValidation()", () => {
    it("should successfully validate the new user's details ", async () => {
      const userDetails: UsersService.regParams = {
        name: "testUser",
        password: "test",
        email: "testUser@test.com",
        phoneNumber: "13011999",

        street_address_1: "testStreet",
        street_address_2: null,
        P_O_BOX: "536-20115 TestArea",
        city: "Nairobi",
        country: "kenya",

        profilePic: "testpath//test.jpg",
      };
      const res = await auth.registrationValidation(userDetails);
      expect(res).toBeTruthy();
    });
  });
});
