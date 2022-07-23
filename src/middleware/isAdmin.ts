import { Response, NextFunction, Request } from 'express';
import { IUser, ErrorWithDetails } from '../interfaces';
import { CustomError, verifyToken } from '../utilities';
import { constants } from '../helpers';

export default async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { accessToken } = req.cookies;
  const unAuthMessage = constants.messages.authResponse.unAuthUser;
  try {
    if (!accessToken) throw new CustomError(unAuthMessage, 401);

    const admin: IUser = await verifyToken(accessToken);

    if (admin.roleId !== 1) throw new CustomError(unAuthMessage, 401);

    next();
  } catch (err) {
    const detailedError = (err as ErrorWithDetails).details;

    if (detailedError) { next(new CustomError(detailedError[0].message, 401)); }

    next(err);
  }
};
