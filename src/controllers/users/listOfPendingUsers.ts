import { Response, NextFunction, Request } from 'express';
import { getUsersStatus } from '../../services';
import { MESSAGES, USER_STATUS } from '../../helpers/constants';
import { constants } from '../../helpers';

export default async ({ query }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { page, limit } = query;
  try {
    const pendingUsers = await getUsersStatus(USER_STATUS.PENDING, {
      page: Number(page), limit: Number(limit),
    });

    res
      .status(constants.HttpStatus.OK)
      .json({ message: MESSAGES.listOfUsers.notApproved, data: pendingUsers });
  } catch (error) {
    next(error);
  }
};
