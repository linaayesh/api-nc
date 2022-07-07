import { Response, NextFunction } from 'express';
import { UserAuth } from '../interfaces';
import { CustomError, verifyToken } from '../utilities';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { accessToken } = req.cookies;
  try {
    if (!accessToken) throw new CustomError('Unauthorized', 401);
    const admin: any = await verifyToken(accessToken);
    if (!(admin.roleId === 1)) throw new CustomError('Unauthorized', 401);
    req.admin = admin;
    next();
  } catch (err: any) {
    if (err.details) { next(new CustomError(err.details[0].message, 401)); }
    next(err);
  }
};
