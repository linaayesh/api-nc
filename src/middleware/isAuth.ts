import { Response, NextFunction } from 'express';
import { UserAuth } from '../interfaces';
import { CustomError, verifyToken, tokenError } from '../utilities';
import { messages } from '../helpers/constants';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { accessToken } = req.cookies;
  try {
    if (!accessToken) throw new CustomError(messages.authResponse.unAuthUser, 401);
    const user = await verifyToken(accessToken);
    req.user = user;
    next();
  } catch (err) {
    next(tokenError(err as Error));
  }
};
