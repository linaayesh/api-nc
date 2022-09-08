import { Request } from 'express';
import { IResetPassword, IEditProfile } from '../../interfaces/DtoUsers';

export const resetPasswordDTO = (request: Request): IResetPassword => ({ ...request.body });

export const editProfileDTO = (request: Request): IEditProfile => ({ ...request.body });
