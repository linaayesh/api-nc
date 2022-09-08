import { Request } from 'express';
import {
  IForgetPassword, ILogin, IGoogleTokenId, IResetPassword, ISignup,
} from '../../interfaces/DtoAuth';

export const forgetPasswordDTO = (request: Request): IForgetPassword => (
  { email: request.body.email.toLowerCase() });

export const loginDTO = (request: Request): ILogin => ({
  email: request.body.email.toLowerCase(),
  password: request.body.password,
  rememberMe: request.body.rememberMe,
});

export const GoogleDTO = (request: Request): IGoogleTokenId => ({
  tokenId: request.body.tokenId,
});

export const resetPasswordDTO = (request: Request): IResetPassword => ({
  password: request.body.password,
  resetPasswordToken: request.cookies,
});

export const signupDTO = (request: Request): ISignup => ({
  password: request.body.password,
  name: request.body.name,
  email: request.body.email.toLowerCase(),
});
