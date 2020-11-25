import { UserEntity } from "../../../../../services/users_service/entity";
import { IUser } from "../../../../../services/users_service/service_repository";
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
    afterEach(() => {
      jest.clearAllMocks();
    });

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
    beforeEach(() => {
      const user: IUser = {
        name: "testUser",
        password: "test",
        email: "testUser@test.com",
        phoneNumber: "13011999",
        _id: "1",
        Address: "testAddress",
        profilePic: "testpath//test.jpg",
      };
      jest.spyOn(testRepo, "findUser").mockReturnValue(user);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

  
    it("should sucessfully return a valid user entity", async () => {
      const result = await profileUsecase.fetchProfile(id);
      expect(result).toStrictEqual<UserEntity>(newUser);
    });

    // it("should throw when passed invalid id", async () => {
    //   //todo:change the mock implementation to return null on findUser
    //   const spy = jest.spyOn(testRepo, "findUser").mockReturnValue({});

    //   await expect(() => profileUsecase.fetchProfile("2")).rejects.toThrowError(
    //     new Error("invalid id")
    //   );

    //   spy.mockReset();
    //   spy.mockRestore();
    // });

  });
});
