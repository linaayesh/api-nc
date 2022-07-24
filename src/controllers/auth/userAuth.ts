import { Response, NextFunction, Request } from 'express';
import { IUser, ErrorWithDetails } from '../../interfaces';
import {
  verifyToken, CustomError,
} from '../../utilities';
import { constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { accessToken } = req.cookies;
  const { approvedUser, unAuthUser } = constants.messages.authResponse;
  try {
    if (!accessToken) throw new CustomError(unAuthUser, 401);
    const user: IUser = await verifyToken(accessToken);
    res.json({ message: approvedUser, data: user });
  } catch (err) {
    const detailedError = (err as ErrorWithDetails).details;
    if (detailedError) { next(new CustomError(detailedError[0].message, 401)); }
    next(err);
  }
};
