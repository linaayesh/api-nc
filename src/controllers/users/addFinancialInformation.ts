import { NextFunction, Response } from 'express';
import { UserAuth } from '../../interfaces';
import { CustomError, financialInformation } from '../../utilities';
import { messages, HttpStatus } from '../../helpers/constants';
import { addFinancialInformation } from '../../services';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { body, user } = req;
  try {
    const validationData = await financialInformation.validateAsync(body);

    if (!user) throw new CustomError(messages.authResponse.NOT_FOUND, HttpStatus.NOT_FOUND);

    const { name, address } = validationData;
    const { id } = user;

    await addFinancialInformation({
      name,
      address,
      createdBy: id,
      userId: id,
    });

    res.status(HttpStatus.CREATED).json({ message: messages.authResponse.SUCCESS });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 400));
    }
  }
};
