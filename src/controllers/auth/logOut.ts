import { Request, Response } from 'express';
import { constants } from '../../helpers';

export default async (req: Request, res: Response):
Promise<void> => {
  const { logOut } = constants.messages.authResponse;
  const { accessToken } = constants.messages.token;
  res.clearCookie(accessToken).json({ message: logOut });
};
