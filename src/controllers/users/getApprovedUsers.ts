import { Request, Response, NextFunction } from 'express';
import { getUsersStatus } from '../../services';
import { messages, USER_STATUS, HttpStatus } from '../../helpers/constants';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const approvedUsers = await getUsersStatus(USER_STATUS.APPROVED);
    res
      .status(HttpStatus.OK)
      .json({ message: messages.listOfUsers.approved, data: approvedUsers });
  } catch (err) {
    next(err);
  }
};
