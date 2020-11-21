import { UserEntity } from "../entity";
export type fieldProperties =
  | "_id"
  | "name"
  | "email"
  | "phoneNumber"
  | "profilePic"
  | "Address";
  export interface IUpdateField{
    field:fieldProperties,
    value:string
  }
export interface UserCredentials {
  email?: string;
  phoneNumber?: string;
  password: string;
}
export type validationFields = {
  email?: string;
  phoneNumber?: string;
  _id?: string;
};
export interface IUser extends UserCredentials {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePic: string;
  Address: string;
}

export interface IUserRepository {
  findUser: (options: validationFields) => Promise<IUser>;
  saveUser: (options: IUser) => Promise<UserEntity>;
  UpdateUserField: (input:{
    options: validationFields,
    updateParam: IUpdateField
  }
  ) => Promise<UserEntity>;
}
