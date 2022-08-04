import { Response, NextFunction } from 'express';
import { CustomError, verifyToken, tokenError } from '../utilities';
import { UserAuth } from '../interfaces';
import { Users } from '../database/models';
import { constants } from '../helpers';

export default (userTypes: number[]) => async (
  req: UserAuth,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const { USER_STATUS, messages } = constants;
  const { UNAUTHORIZED, notExist } = messages.authResponse;
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) throw new CustomError(UNAUTHORIZED, 401);

    const userPayload = await verifyToken(accessToken);

    const { id } = userPayload;

    const userData = await Users.findOne({ where: { id } });

    if (!userData) throw new CustomError(notExist, 404);

    const { userRoleId, userStatusId } = userData;

    if (!userTypes.includes(userRoleId) && userStatusId !== USER_STATUS.APPROVED) throw new CustomError('UnAuthorized', 401);

    req.user = userData;

    next();
  } catch (error) {
    next(tokenError(error as Error));
  }
};
