import { Response, NextFunction } from 'express';
import { IUser, UserAuth } from '../interfaces';
import { CustomError, verifyToken } from '../utilities';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { accessToken } = req.cookies;
  try {
    if (!accessToken) throw new CustomError('Unauthorized User', 401);
    const user: IUser = await verifyToken(accessToken);
    req.user = user;
    next();
  } catch (err: any) {
    if (err?.details) { next(new CustomError(err?.details[0].message, 401)); }
    next(err);
  }
};
