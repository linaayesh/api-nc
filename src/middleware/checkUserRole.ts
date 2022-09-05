import { Response, NextFunction, Request } from 'express';
import {
  constants, CustomError, verifyToken, tokenError,
} from '../helpers';
import { getUserById } from '../services';

export default (userTypes: number[]) => async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userStatus, messages } = constants;
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new CustomError(messages.authResponse.UNAUTHORIZED, constants.httpStatus.UNAUTHORIZED);
    }

    const userPayload = await verifyToken(accessToken);

    const { id } = userPayload;

    const userData = await getUserById(id as number);

    if (!userData) {
      throw new CustomError(messages.authResponse.NOT_EXIST, constants.httpStatus.NOT_FOUND);
    }

    const { userRoleId, userStatusId } = userData;

    if (!userTypes.includes(userRoleId) || userStatusId !== userStatus.APPROVED) {
      throw new CustomError(messages.authResponse.UNAUTHORIZED, constants.httpStatus.UNAUTHORIZED);
    }

    req.app.set('user', userData);

    next();
  } catch (error) {
    next(tokenError(error as Error));
  }
};
