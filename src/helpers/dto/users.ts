import { Request } from 'express';
import { addUser, resetPassword } from '../../interfaces/DtoUsers';

export const addUserDTO = (request: Request): addUser => (
  {
    name: request.body.name,
    email: request.body.email.toLowerCase(),
    roleId: request.body.roleId,
  });

export const resetPasswordDTO = (request: Request): resetPassword => ({ ...request.body });
