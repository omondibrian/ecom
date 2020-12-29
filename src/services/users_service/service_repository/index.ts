import TableName from "../../../constants/tableNames";
import User from "./models/user.modal";
import Vendor from "./models/vendor.model";

export default class UsersServiceRepository
  implements UsersService.IUserRepository {
  private _formatUserOutputEntity(
    user: User,
    options?: { enableStr?: boolean; displayId?: boolean }
  ): UsersService.UserEntity {
    const { enableStr, displayId } = options;
    let { address, _id, email, name, phone_number, profile_image_url } = user;
    const {
      street_address_1,
      street_address_2,
      P_O_BOX,
      country,
      city,
    } = address;
    const withId = {
      _id: enableStr ? _id + "" : _id,
      Address: {
        street_address_1,
        street_address_2,
        P_O_BOX,
        country: { name: country.name },
        city: { name: city.name },
      },
      email,
      name,
      phoneNumber: phone_number + "",
      profilePic: profile_image_url,
    };
    const noId = {
      Address: {
        street_address_1,
        street_address_2,
        P_O_BOX,
        country: { name: country.name },
        city: { name: city.name },
      },
      email,
      name,
      phoneNumber: phone_number + "",
      profilePic: profile_image_url,
    };
    return displayId ? withId : noId;
  }

  private _formatVendorOutputEntity(user: Vendor): UsersService.IVendorModel {
    let { address,  email, user_id, name, logo_url, description } = user;
    const {
      street_address_1,
      street_address_2,
      P_O_BOX,
      country,
      city,
    } = address;
    const withId = {
      user_id,
      Address: {
        street_address_1,
        street_address_2,
        P_O_BOX,
        country: { name: country.name },
        city: { name: city.name },
      },
      email,
      name,
      logo_url,
      description,
    };

    return withId;
  }
  async findUser(
    options: UsersService.validationFields
  ): Promise<UsersService.IUserModel> {
    const user = await User.query()
      .withGraphJoined({
        [TableName.address]: true,
        [TableName.address]: {
          city: true,
          country: true,
        },
      })
      .where(options);
    const enableStr = false;
    return {
      ...this._formatUserOutputEntity(user[0], { enableStr, displayId: true }),
      password: user[0].password,
    };
  }
  async saveUser(
    options: UsersService.IUserModel
  ): Promise<UsersService.UserEntity> {
    let { name, email, password, Address, phoneNumber, profilePic } = options;
    const savedUser = await User.query().insertGraphAndFetch(
      {
        name,
        email,
        password,
        phone_number: phoneNumber,
        profile_image_url: profilePic,
        [TableName.address]: {
          street_address_1: Address.street_address_1,
          street_address_2: Address.street_address_2,
          P_O_BOX: Address.P_O_BOX,
          city: Address.city,
          country: Address.country,
        },
      },
      { relate: true }
    );

    return this._formatUserOutputEntity(savedUser, { displayId: false });
  }
  async UpdateUserField(input: {
    options: UsersService.validationFields;
    updateParam: UsersService.IUpdateField;
  }): Promise<UsersService.UserEntity> {
    const { options, updateParam } = input;
    const { field, value } = updateParam;
    await User.query().updateAndFetchById(options._id, {
      [field]: value,
    });
    const user = await User.query()
      .withGraphJoined({
        [TableName.address]: true,
        [TableName.address]: {
          city: true,
          country: true,
        },
      })
      .where({ email: options.email });
    return this._formatUserOutputEntity(user[0], {
      enableStr: true,
      displayId: true,
    });
  }

  async addNewVendor(
    inputVendor: UsersService.IVendorEntity
  ): Promise<UsersService.IVendorModel> {
    let { user_id, name, email, Address, logo_url, description } = inputVendor;
    const savedvendor = await Vendor.query().insertGraphAndFetch(
      {
        name,
        email,
        user_id,
        description,
        logo_url,
        [TableName.address]: {
          street_address_1: Address.street_address_1,
          street_address_2: Address.street_address_2,
          P_O_BOX: Address.P_O_BOX,
          city: Address.city,
          country: Address.country,
        },
      },
      { relate: true }
    );
    // console.log(savedvendor);
    return this._formatVendorOutputEntity(savedvendor);
  }
}
