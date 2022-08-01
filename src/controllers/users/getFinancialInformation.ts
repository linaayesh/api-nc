import { NextFunction, Response } from 'express';
import { UserAuth } from '../../interfaces';
import { CustomError } from '../../utilities';
import { messages } from '../../helpers/constants';
import { getFinancialInformation } from '../../services';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { user } = req;
  try {
    if (!user) throw new CustomError(messages.authResponse.notExist, 401);

    const { id } = user;

    const paymentsInformation = await getFinancialInformation(id);

    res.status(201).json({ message: messages.authResponse.SUCCESS, data: paymentsInformation });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 400));
    }
  }
};
