import { Request, Response, NextFunction } from 'express';
import { getUsersStatus } from '../../services';
import { MESSAGES, USER_STATUS, HttpStatus } from '../../helpers/constants';

export default async ({ query }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { page, limit } = query;
  try {
    const approvedUsers = await getUsersStatus(USER_STATUS.APPROVED, {
      page: Number(page), limit: Number(limit),
    });
    res
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.listOfUsers.approved, data: approvedUsers });
  } catch (err) {
    next(err);
  }
};
