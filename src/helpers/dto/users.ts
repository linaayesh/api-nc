import { Request } from 'express';
import { resetPassword, editProfile } from '../../interfaces/DtoUsers';

export const resetPasswordDTO = (request: Request): resetPassword => ({ ...request.body });

export const editProfileDTO = (request: Request): editProfile => ({ ...request.body });
