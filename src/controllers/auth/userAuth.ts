import { Response, NextFunction } from 'express';
import { UserAuth } from '../../interfaces';
import { CustomError } from '../../utilities';
import { constants } from '../../helpers';

export default async ({ user }: UserAuth, res: Response, next: NextFunction):
Promise<void> => {
  const { approvedUser, UNAUTHORIZED } = constants.messages.authResponse;
  try {
    if (!user) throw new CustomError(UNAUTHORIZED, 401);

    const {
      id, userRoleId, email, username, image,
    } = user;

    res.json({
      message: approvedUser,
      data: {
        id, userRoleId, email, username, image,
      },
    });
  } catch (error) {
    next(error);
  }
};
