export default class ProfileUsecase {
  constructor(private readonly repository: UsersService.IUserRepository) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async changeProfilePhoto({ _id, payload }: UsersService.ProfileInputs) {
    const {
      profilePic,
    }: UsersService.UserEntity = await this.repository.UpdateUserField({
      options: { _id },
      updateParam: { field: "profile_image_url", value: payload },
    });

    return {
      _id,
      profilePic,
    };
  }

  async fetchProfile(id: string): Promise<UsersService.UserEntity> {
    const result: UsersService.IUserModel = await this.repository.findUser({
      _id: id,
    });
    const {
      _id,
      Address,
      email,
      name,
      phoneNumber,
      profilePic,
    } = result;
    return {
      _id: _id + "",
      Address,
      email,
      name,
      phoneNumber,
      profilePic,
    };
  }
}
