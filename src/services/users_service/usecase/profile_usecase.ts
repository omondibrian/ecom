import { UserEntity } from "../entity";
import { IUserRepository } from "../service_repository";

export type ProfileInputs = {
  _id: string;
  payload: string;
};

export default class ProfileUsecase {
  constructor(private readonly repository: IUserRepository) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async changeProfilePhoto({ _id, payload }: ProfileInputs) {
    const { profilePic }: UserEntity = await this.repository.UpdateUserField({
      options: { _id },
      updateParam: { field: "profilePic", value: payload },
    });

    return {
      _id,
      profilePic,
    };
  }

  async fetchProfile(id: string): Promise<UserEntity> {
    const result: UserEntity = await this.repository.findUser({ _id: id });
    if (!result) new Error("invalid id");
    const { _id, Address, email, name, phoneNumber, profilePic } = result;

    return { _id, Address, email, name, phoneNumber, profilePic };
  }
}
