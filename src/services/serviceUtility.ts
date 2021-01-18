export interface IAuthserviceUtilities {
  loginValidation: (entityBody: any) => any;
  registrationValidation: (entityBody: any) => any;
}
import * as yup from 'yup';
export class AuthserviceUtilities implements IAuthserviceUtilities {
  async loginValidation(entityBody: UsersService.UserCredentials) {
    const loginValidationschema = yup.object().shape({
      email: yup.string().email().required().trim(),
      password: yup.string().trim().required(),
      phoneNumber: yup.string().trim(),
    });
    const res = await loginValidationschema.validate(entityBody);
    return res;
  }
  async registrationValidation(entityBody: UsersService.regParams) {
    const registrationValidationschema = yup.object().shape({
      email: yup.string().email().required().trim(),
      password: yup.string().trim().required(),
      phoneNumber: yup.string().trim().required(),
      name: yup.string().required(),
      street_address_1: yup.string().required(),
      street_address_2: yup.string().nullable().notRequired(),
      P_O_BOX: yup.string().required(),
      city: yup.string().required(),
      country: yup.string().required(),
      profilePic: yup.string().notRequired(),
    });
    const res = await registrationValidationschema.validate(entityBody);
    return res;
  }
}
