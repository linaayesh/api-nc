import { Response, NextFunction, Request } from 'express';
import { getUsersStatus } from '../../services';
import { messages, USER_STATUS } from '../../helpers/constants';
import { constants } from '../../helpers';

export default async (_req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const pendingUsers = await getUsersStatus(USER_STATUS.PENDING);

    res
      .status(constants.HttpStatus.OK)
      .json({ message: messages.listOfUsers.notApproved, data: pendingUsers });
  } catch (error) {
    next(error);
  }
};
