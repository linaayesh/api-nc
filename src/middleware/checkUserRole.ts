import { Response, NextFunction, Request } from 'express';
// import { UserAuth } from '../interfaces';
import {
  constants, CustomError, verifyToken, tokenError,
} from '../helpers';
import { getUserById } from '../services';

export default (userTypes: number[]) => async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const { USER_STATUS, MESSAGES } = constants;
  const { UNAUTHORIZED, notExist } = MESSAGES.authResponse;
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) throw new CustomError(UNAUTHORIZED, constants.HttpStatus.UNAUTHORIZED);

    const userPayload = await verifyToken(accessToken);

    const { id } = userPayload;

    const userData = await getUserById(id as number);

    if (!userData) throw new CustomError(notExist, constants.HttpStatus.NOT_FOUND);

    const { userRoleId, userStatusId } = userData;

    if (!userTypes.includes(userRoleId) || userStatusId !== USER_STATUS.APPROVED) {
      throw new CustomError(UNAUTHORIZED, constants.HttpStatus.UNAUTHORIZED);
    }

    req.app.set('user', userData);

    next();
  } catch (error) {
    next(tokenError(error as Error));
  }
};
