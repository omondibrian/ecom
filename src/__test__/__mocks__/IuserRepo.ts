export default class UsersTestRepository
  implements UsersService.IUserRepository {
  constructor() {}
  addNewVendor(input: UsersService.IVendorEntity): Promise<UsersService.IVendorModel> {
    throw new Error("Method not implemented.");
  }

  findUser(
    options: UsersService.validationFields
  ): Promise<UsersService.IUser> | any {
    const user: UsersService.IUserModel = {
      name: "testUser",
      password: "test",
      email: "testUser@test.com",
      phoneNumber: "13011999",
      _id: 1,
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
    return Promise.resolve(user);
  }
  async saveUser(
    options: UsersService.IUserModel
  ): Promise<UsersService.UserEntity> {
    const { Address, phoneNumber, profilePic, email, name, _id } = options;
    return {
      Address,
      phoneNumber,
      name,
      profilePic,
      email,
      _id: "1",
    };
  }
  UpdateUserField(inputs: {
    options: UsersService.validationFields;
    updateParam: UsersService.IUpdateField;
  }): Promise<UsersService.UserEntity> | any {}
}
