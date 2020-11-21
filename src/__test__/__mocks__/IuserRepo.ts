import { UserEntity } from "../../services/users_service/entity";
import {
  IUserRepository,
  validationFields,
  IUser, IUpdateField
} from "../../services/users_service/service_repository";

export default class UsersTestRepository implements IUserRepository {
  constructor() {}
  findUser(options: validationFields): Promise<IUser> | any {
    const user: IUser = {
      name: "testUser",
      password: "test",
      email: "testUser@test.com",
      phoneNumber: "13011999",
      _id: "1",
      Address: "testAddress",
      profilePic: "testpath//test.jpg",
    };
    return new Promise((res, rej) => {
      res(user);
    });
  }
  async saveUser(options: IUser): Promise<UserEntity> {
    return options as UserEntity;
  }
  UpdateUserField(inputs:{
    options: validationFields,
    updateParam: IUpdateField,
  }): Promise<UserEntity> | any {}
}
