import { Request, Response, NextFunction } from 'express';
import { USER_STATUS, messages, HttpStatus } from '../../helpers/constants';
import { getUsersStatus } from '../../services';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const RejectedUsers = await getUsersStatus(USER_STATUS.REJECTED);

    res
      .status(HttpStatus.OK)
      .json({ message: messages.listOfUsers.rejected, data: RejectedUsers });
  } catch (error) {
    next(error);
  }
};
