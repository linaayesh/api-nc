import { Response, NextFunction } from 'express';
import { UserAuth } from '../../interfaces';
import { constants, CustomError } from '../../helpers';

export default async ({ user }: UserAuth, res: Response, next: NextFunction):
Promise<void> => {
  const { approvedUser, UNAUTHORIZED } = constants.MESSAGES.authResponse;
  const { OK } = constants.HttpStatus;
  try {
    if (!user) throw new CustomError(UNAUTHORIZED, 401);

    const {
      id,
      userRoleId,
      email,
      name,
      image,
    } = user;

    const lowerCaseEmail = email.toLowerCase();

    res
      .status(OK)
      .json({
        message: approvedUser,
        data: {
          id, roleId: userRoleId, email: lowerCaseEmail, name, image,
        },
      });
  } catch (error) {
    next(error);
  }
};
