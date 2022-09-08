import { Response, NextFunction, Request } from 'express';
import {
  constants, verifyToken, tokenError, errorMessages,
} from '../helpers';
import { getAllUserDataById } from '../services';

export default (userTypes: number[]) => async (
  request: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userStatus } = constants;
  try {
    const { accessToken } = request.cookies;

    if (!accessToken) {
      throw errorMessages.UNAUTHORIZED_ERROR;
    }

    const userPayload = await verifyToken(accessToken);

    const { id } = userPayload;

    const userData = await getAllUserDataById(id as number);

    if (!userData) {
      throw errorMessages.NOT_EXIST_ERROR;
    }

    const { userRoleId, userStatusId } = userData;

    if (!userTypes.includes(userRoleId) || userStatusId !== userStatus.APPROVED) {
      throw errorMessages.UNAUTHORIZED_ERROR;
    }

    request.app.set('user', userData);

    next();
  } catch (error) {
    next(tokenError(error as Error));
  }
};
