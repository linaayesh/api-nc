import { Request } from 'express';
import {
  forgetPassword, login, Google, resetPassword, signup,
} from '../../interfaces/DtoAuth';

export const forgetPasswordDTO = (request: Request): forgetPassword => (
  { email: request.body.email.toLowerCase() });

export const loginDTO = (request: Request): login => ({
  email: request.body.email.toLowerCase(),
  password: request.body.password,
  rememberMe: request.body.rememberMe,
});

export const GoogleDTO = (request: Request): Google => ({
  tokenId: request.body.tokenId,
});

export const resetPasswordDTO = (request: Request): resetPassword => ({
  password: request.body.password,
  resetPasswordToken: request.cookies,
});

export const signupDTO = (request: Request): signup => ({
  password: request.body.password,
  name: request.body.name,
  email: request.body.email.toLowerCase(),
});
