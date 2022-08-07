import { Request, Response, NextFunction } from 'express';
import { constants } from '../../helpers';
import { getUsersStatus } from '../../services';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const RejectedUsers = await getUsersStatus(constants.USER_STATUS.REJECTED);

    res.json({ message: constants.messages.listOfUsers.rejected, data: RejectedUsers });
  } catch (err) {
    next(err);
  }
};
