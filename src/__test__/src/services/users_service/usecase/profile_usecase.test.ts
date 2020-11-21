import { UserEntity } from "../../../../../services/users_service/entity";
import ProfileUsecase from "../../../../../services/users_service/usecase/profile_usecase";
import UsersTestRepository from "../../../../__mocks__/IuserRepo";

const testRepo = new UsersTestRepository();

const newUser: UserEntity = {
  name: "testUser",
  email: "testUser@test.com",
  phoneNumber: "13011999",
  _id: "1",
  Address: "testAddress",
  profilePic: "testpath//test.jpg",
};

describe("ProfileUsecase", () => {
  const profileUsecase = new ProfileUsecase(testRepo);
  const id = "1";

  describe("ProfileUsecase.changeProfilePhoto()", () => {
    beforeEach(() => {
      const mockUpdate = jest.spyOn(testRepo, "UpdateUserField");
      mockUpdate.mockImplementation(() => {
        return {
          name: "testUser",
          email: "testUser@test.com",
          phoneNumber: "13011999",
          _id: "1",
          Address: "testAddress",
          profilePic: "testpath/test_new.jpg",
        };
      });
    });

    it("should successfully change user profile picture", async () => {
      const result = await profileUsecase.changeProfilePhoto({
        _id: "1",
        payload: "testpath/test_new.jpg",
      });

      expect(result).toStrictEqual<{ _id: string; profilePic: string }>({
        _id: "1",
        profilePic: "testpath/test_new.jpg",
      });
    });
  });

  describe("ProfileUsecase.fetchProfile()", () => {

    it("should throw when passed invalid id", () => {
    //todo:change the mock implementation to return null on findUser
    //  const mockFindUser = jest
    //    .spyOn(testRepo, "findUser")
    //    .mockImplementation(() => {
    //      return null;
      //  });
      expect(() => profileUsecase.fetchProfile("2")).rejects.toThrowError(
        new Error("invalid id")
      );
     // mockFindUser.mockReset();
    });
    
    it("should sucessfully return a valid user entity", async () => {
      const result = await profileUsecase.fetchProfile(id);
      expect(result).toStrictEqual<UserEntity>(newUser);
    });

  });
});
