import { Request, Response, NextFunction } from 'express';
import { getUsersStatus } from '../../services';
import { messages, USER_STATUS, HttpStatus } from '../../helpers/constants';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const ApprovedUsers = await getUsersStatus(USER_STATUS.APPROVED);

    res
      .status(HttpStatus.OK)
      .json({ message: messages.listOfUsers.approved, data: ApprovedUsers });
  } catch (err) {
    next(err);
  }
};
