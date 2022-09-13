import { IResetPassword, IEditProfile } from '../../interfaces/DtoUsers';
import { IUserRequest } from '../../interfaces';

export const resetPasswordDTO = (request: IUserRequest): IResetPassword => (
  { ...request.body, user: request.user });

export const editProfileDTO = (request: IUserRequest): IEditProfile => (
  { ...request.body, user: request.user });
