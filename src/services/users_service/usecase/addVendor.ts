export class AddVendorUsecase {
  constructor(private readonly repository: UsersService.IUserRepository) {}

   add(input:UsersService.IVendorEntity):Promise<UsersService.IVendorModel>{
      return this.repository.addNewVendor(input)
  }
}
