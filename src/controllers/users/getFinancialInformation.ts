import { NextFunction, Response } from 'express';
import { UserAuth } from '../../interfaces';
import { CustomError } from '../../utilities';
import { messages, HttpStatus } from '../../helpers/constants';
import { getFinancialInformation } from '../../services';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { user } = req;
  try {
    if (!user) throw new CustomError(messages.authResponse.NOT_FOUND, HttpStatus.NOT_FOUND);

    const { id } = user;

    const paymentsInformation = await getFinancialInformation(id);

    res
      .status(HttpStatus.OK)
      .json({ message: messages.authResponse.SUCCESS, data: paymentsInformation });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 400));
    }
  }
};
