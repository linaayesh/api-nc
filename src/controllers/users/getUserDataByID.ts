import { Request, Response, NextFunction } from 'express';
import { CustomError, constants } from '../../helpers';
import { getUserById } from '../../services';

const { messages, HttpStatus } = constants;

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await getUserById(+userId);
    if (!user) throw new CustomError(messages.authResponse.notExist, HttpStatus.NOT_FOUND);

    res.status(HttpStatus.OK).json({ data: user });
  } catch (error) {
    next(error);
  }
};
