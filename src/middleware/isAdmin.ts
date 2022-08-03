import { Response, NextFunction, Request } from 'express';
import { IUser } from '../interfaces';
import { CustomError, tokenError, verifyToken } from '../utilities';
import { constants } from '../helpers';

export default async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { accessToken } = req.cookies;
  const unAuthMessage = constants.messages.authResponse.unAuthUser;
  try {
    if (!accessToken) throw new CustomError(unAuthMessage, 401);

    const admin: IUser = await verifyToken(accessToken);

    if (admin.userRoleId !== 1) throw new CustomError(unAuthMessage, 401);

    next();
  } catch (error) {
    next(tokenError(error as Error));
  }
};
