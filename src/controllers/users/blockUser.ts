import { NextFunction, Response } from 'express';
import { UserAuth } from '../../interfaces';
import { checkExistence, constants } from '../../helpers';

export default async (req: UserAuth, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await checkExistence.ApprovalChecks(+userId);
    const { USER_STATUS, HttpStatus, messages } = constants;

    user.userStatusId = USER_STATUS.BANNED;
    user.updatedBy = req.user?.id;
    await user.save();

    res
      .status(HttpStatus.OK)
      .json({ message: messages.authResponse.SUCCESS });
  } catch (err) {
    next(err);
  }
};
