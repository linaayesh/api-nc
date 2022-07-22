import { Response, NextFunction } from 'express';
import { UserAuth, IUser } from '../../interfaces';
import {
  verifyToken, CustomError,
} from '../../utilities';
import { constants } from '../../helpers';

export default async (req: UserAuth, res: Response, next: NextFunction):
Promise<void> => {
  const { accessToken } = req.cookies;
  const { approve, unAuthUser } = constants.messages.authResponse;
  try {
    if (!accessToken) throw new CustomError(unAuthUser, 401);
    const user: IUser = await verifyToken(accessToken);
    res.json({ message: approve, data: user });
  } catch (err: Error | any) {
    if (err.details) { next(new CustomError(err.details[0].message, 401)); }
    next(err);
  }
};
