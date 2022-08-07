import { Response, NextFunction, Request } from 'express';
import { getUsersStatus } from '../../services';
import { messages, USER_STATUS } from '../../helpers/constants';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const pendingUsers = await getUsersStatus(USER_STATUS.PENDING);

    res.json({ message: messages.listOfUsers.notApproved, data: pendingUsers });
  } catch (err) {
    next(err);
  }
};
