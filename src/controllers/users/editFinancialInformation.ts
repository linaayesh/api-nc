import { NextFunction, Response } from 'express';
import { UserAuth } from '../../interfaces';
import { CustomError, financialInformation } from '../../utilities';
import { messages } from '../../helpers/constants';
import { getFinancialInformation } from '../../services';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { body, user } = req;
  try {
    if (!user) throw new CustomError(messages.authResponse.notExist, 401);

    const validationData = await financialInformation.validateAsync(body);

    const { name, address } = validationData;
    const { id } = user;

    const financeData = await getFinancialInformation(id);
  
    if (!financeData) throw new CustomError(messages.authResponse.notExist, 401);

    financeData.name = name;
    financeData.address = address;
    financeData.updatedBy = id;

    financeData.save();

    res.status(201).json({ message: messages.authResponse.SUCCESS });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 400));
    }
  }
};
