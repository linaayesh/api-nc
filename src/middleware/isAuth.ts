import { Response, NextFunction } from 'express';
import { UserAuth } from '../interfaces';
import { CustomError } from '../utilities';
import { verifyToken } from '../utilities/jwt';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { accessToken } = req.cookies;
  try {
    if (!accessToken) throw new CustomError('Unauthorized User', 401);
    const user: any = await verifyToken(accessToken);
    req.user = user;
    next();
  } catch (err: any) {
    if (err.details) { next(new CustomError(err.details[0].message, 401)); }
    next(err);
  }
};
