import { Response, NextFunction, Request } from 'express';
import { constants } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction):
Promise<void> => {
  const { messages, httpStatus } = constants;
  const user = request.app.get('user');

  try {
    const {
      id,
      userRoleId,
      email,
      name,
      image,
    } = user;

    response
      .status(httpStatus.OK)
      .json({
        message: messages.authResponse.APPROVED_USER,
        data: {
          id, roleId: userRoleId, email, name, image,
        },
      });
  } catch (error) {
    next(error);
  }
};
