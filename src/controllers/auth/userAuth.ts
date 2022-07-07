import { Response, NextFunction } from 'express';
import { UserAuth } from '../../interfaces';
import {
  verifyToken, CustomError,
} from '../../utilities';

export default async (req: UserAuth, res: Response, next: NextFunction):
Promise<void> => {
  const { accessToken } = req.cookies;
  try {
    if (!accessToken) throw new CustomError('Unauthorized User', 401);
    const user: any = await verifyToken(accessToken);
    res.json({ message: 'The user is verified', data: user });
  } catch (err: any) {
    if (err.details) { next(new CustomError(err.details[0].message, 401)); }
    next(err);
  }
};
