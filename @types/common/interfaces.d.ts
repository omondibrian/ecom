declare namespace UsersService {
  interface UserEntity {
    _id?: number | string;
    name: string;
    email: string;
    phoneNumber: string;
    profilePic: string;
    Address: IAddress;
  }

  type fieldProperties =
    | "_id"
    | "name"
    | "email"
    | "phone_number"
    | "profile_image_url"
    | "address_id";
  interface IUpdateField {
    field: fieldProperties;
    value: string;
  }
  interface UserCredentials {
    email?: string;
    phoneNumber?: string;
    password: string;
  }
  interface IVendorEntity {
    _id?:number,
    user_id:number,
    name:string,
    Address:IAddress,
    logo_url:string,
    email:string,
    description:string
  }
  interface IVendorModel {
    _id?:number,
    user_id:number,
    name:string,
    Address:IAddress,
    logo_url:string,
    email:string,
    description:string
  }
  type IAddress = {
    street_address_1: string;
    street_address_2?: string;
    P_O_BOX: string;
    city: {
      name: string;
    };
    country: {
      name: string;
    };
  };
  type validationFields = {
    email?: string;
    phone_number?: string;
    _id?: string;
  };
  type ProfileInputs = {
    _id: string;
    payload: string;
  };
  interface IUser extends UserCredentials {
    _id?: number;
    name: string;
    email: string;
    phone_number: string;
    profile_image_url: string;
    address_id: string;
  }
  interface IUserModel {
    _id?: number | string;
    name: string;
    email: string;
    phoneNumber: string;
    profilePic: string;
    password: string;
    Address: {
      street_address_1: string;
      street_address_2?: string;
      P_O_BOX: string;
      city: {
        name: string;
      };
      country: {
        name: string;
      };
    };
  }
  interface IUserRepository {
    findUser: (options: validationFields) => Promise<IUserModel>;
    saveUser: (options: IUserModel) => Promise<UserEntity>;
    UpdateUserField: (input: {
      options: validationFields;
      updateParam: IUpdateField;
    }) => Promise<UserEntity>;
  }
}
