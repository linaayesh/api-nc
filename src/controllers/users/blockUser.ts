import { NextFunction, Response } from 'express';
import { UserAuth } from '../../interfaces';
import { checkExistence, constants, CustomError } from '../../helpers';
import { getUserById } from '../../services';

export default async (req: UserAuth, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;
  try {
    const userData = await getUserById(+userId);
    const user = await checkExistence.ApprovalChecks(userData);
    const { USER_STATUS, HttpStatus, MESSAGES } = constants;

    if (!req.user) {
      throw new CustomError(MESSAGES.authResponse.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    user.userStatusId = USER_STATUS.BANNED;
    user.updatedBy = req.user.id;
    await user.save();

    res
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.authResponse.SUCCESS });
  } catch (err) {
    next(err);
  }
};
