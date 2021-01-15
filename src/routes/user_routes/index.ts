import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { generate } from "randomstring";
import { IMailer, Mailer } from "../../services/email_service/mailer";
import { IAuthserviceUtilities } from "../../services/serviceUtility";
import ProfileUsecase from "../../services/users_service/usecase/profile_usecase";
import AuthenticationUsecase from "../../services/users_service/usecase/auth";
import UsersServiceRepository from "../../services/users_service/service_repository";
import { AddVendorUsecase } from "../../services/users_service/usecase/addVendor";

let utils: IAuthserviceUtilities;
let mailer: IMailer = new Mailer();
const userRoutes = Router();
const repository = new UsersServiceRepository();
const addVendor = new AddVendorUsecase(repository)
const profileUseCase = new ProfileUsecase(repository);
const authUsecase = new AuthenticationUsecase(
  repository,
  utils,
  jwt,
  bcrypt,
  generate,
  mailer
);
/**
 * @method POST
 * @description login route
 * @param  {UsersService.UserCredentials} req.body.credentials
 */
userRoutes.post("/login", async (req, res, next) => {
  const { credentials } = req.body;
  try {
    const result = await authUsecase.logInUser(credentials);
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

/**
 * @method POST
 * @description register user route
 * @param  {UsersService.IUserModel} req.body.newUser
 */
userRoutes.post("/register", async (req, res, next) => {
  const { newUser } = req.body;
  try {
    const result = await authUsecase.registeruser(newUser);
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

/**
 * @method POST
 * @description forgot password route
 * @param  {UsersService.IUserModel} req.body.credentials
 */
userRoutes.post("/register", async (req, res, next) => {
  const { credentials } = req.body;
  try {
    const result = await authUsecase.forgotPass(credentials);
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

/**
 * @method POST
 * @description add vendor
 * @param  {UsersService.IUserModel} req.body.credentials
 */
userRoutes.post("/vendor/register", async (req, res, next) => {
    const { input } = req.body;
    try {
      const result = await addVendor.add(input);
      res.json(result).status(200);
    } catch (error) {
      next(error);
    }
  });

/**
 * @method POST
 * @description change profilePhoto
 * @param  {UsersService.ProfileInputs} req.body
 */
userRoutes.post("/profile", async (req, res, next) => {
  const { _id, payload } = req.body;
  try {
    const result = await profileUseCase.changeProfilePhoto({ _id, payload });
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

/**
 * @method Get
 * @description fetch user profile
 * @param  {string} req.body._id
 */
userRoutes.get("/profile", async (req, res, next) => {
  const { _id } = req.body;
  try {
    const result = await profileUseCase.fetchProfile(_id);
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});
