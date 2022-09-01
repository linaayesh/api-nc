import { Request } from 'express';
import { forgetPasswordBody } from '../../interfaces/dtoInterfaces';

export const forgetPasswordDTO = (request: Request): string => (request.body.email.toLowerCase());

export const test = (body: forgetPasswordBody): string => (body.email.toLowerCase());
