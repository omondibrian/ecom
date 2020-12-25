import UsersServiceRepository from "../../../../../services/users_service/service_repository";
import User from "../../../../../services/users_service/service_repository/models/user.modal";

const repository = new UsersServiceRepository();

describe("UsersServiceRepository", () => {
  afterAll(()=>{
    User.knex().destroy()
  })
  const newUser: UsersService.IUserModel = {
    name: "testUser",
    _id: 1,
    password: "test",
    email: "testUser@test.com",
    phoneNumber: "13011999",
    Address: {
      street_address_1: "testStreet",
      street_address_2: null,
      P_O_BOX: "536-20115 TestArea",
      city: {
        name: "Nairobi",
      },
      country: {
        name: "kenya",
      },
    },
    profilePic: "testpath//test.jpg",
  };

  describe("UserServiceRepository.findUser()", () => {
    it("should successfully return the user based on the validaion fields passed", async () => {
      const options: UsersService.validationFields = {
        phone_number: "13011999",
        email: "testUser@test.com",
      };
      const result = await repository.findUser(options);
      expect(result).toStrictEqual<UsersService.IUserModel>(newUser);
    });
  });
  describe("UserServiceRepository.saveUser()", () => {
    const userToSave: UsersService.IUserModel = {
      name: "testUser",
      password: "test",
      email: "testUser123@test.com",
      phoneNumber: "13011989",
      Address: {
        street_address_1: "testStreet",
        street_address_2: null,
        P_O_BOX: "536-20115 TestArea",
        city: {
          name: "Dar es Salaam",
        },
        country: {
          name: "Tanzania",
        },
      },
      profilePic: "testpath//test.jpg",
    };
    it("should sucessfully save a new user", async () => {
      const result = await repository.saveUser(userToSave);
      const savedUser: UsersService.UserEntity = {
        name: userToSave.name,
        email: userToSave.email,
        phoneNumber: userToSave.phoneNumber,
        profilePic: userToSave.profilePic,
        Address: userToSave.Address,
      };
      expect(result).toStrictEqual<UsersService.UserEntity>(savedUser);
    });
  });
  describe("UsersServiceRepository.UpdateUserField()", () => {
    it("should sucessfully update the given user field(s)", async () => {
      const updatedUser: UsersService.UserEntity = {
        name: "testUser",
        email: "testUser@test.com",
        phoneNumber: "13011999",
        _id: "1",
        Address: {
          street_address_1: "testStreet",
          street_address_2: null,
          P_O_BOX: "536-20115 TestArea",
          city: {
            name: "Nairobi",
          },
          country: {
            name: "kenya",
          },
        },
        profilePic: "./updatedPic.jpg",
      };
      const updateParams: UsersService.IUpdateField = {
        field: "profile_image_url",
        value: "./updatedPic.jpg",
      };
      const updates = await repository.UpdateUserField({
        options: { email : updatedUser.email ,_id:'1'},
        updateParam: updateParams,
      });
      expect(updates).toStrictEqual<UsersService.UserEntity>(updatedUser);
    });
  });

});
