import { Request, Response } from 'express';
import { MESSAGES, HttpStatus } from '../../helpers/constants';

export default async (_req: Request, res: Response):
Promise<void> => {
  const { authResponse, token } = MESSAGES;
  const { OK } = HttpStatus;

  res.status(OK).clearCookie(token.accessToken).json({ message: authResponse.LOGOUT });
};
