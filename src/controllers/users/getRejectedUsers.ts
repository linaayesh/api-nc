import { Request, Response, NextFunction } from 'express';
import { USER_STATUS, MESSAGES, HttpStatus } from '../../helpers/constants';
import { getUsersStatus } from '../../services';

export default async ({ query }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { page, limit } = query;
  try {
    const RejectedUsers = await getUsersStatus(USER_STATUS.REJECTED, {
      page: Number(page), limit: Number(limit),
    });

    res
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.listOfUsers.rejected, data: RejectedUsers });
  } catch (error) {
    next(error);
  }
};
