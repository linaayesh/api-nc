import { Request, Response } from 'express';
import { constants } from '../../helpers';

export default async (req: Request, res: Response):
Promise<void> => {
  const { LOGOUT } = constants.messages.authResponse;
  const { accessToken } = constants.messages.token;
  const { OK } = constants.HttpStatus;
  res.status(OK).clearCookie(accessToken).json({ message: LOGOUT });
};
