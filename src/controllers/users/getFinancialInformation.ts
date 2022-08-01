import { NextFunction, Response } from 'express';
import { UserAuth } from '../../interfaces';
import { CustomError } from '../../utilities';
import { messages } from '../../helpers/constants';
import { Payments } from '../../database/models';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const { user } = req;
  try {
    if (!user) throw new CustomError(messages.authResponse.notExist, 401);

    const { id } = user;

    const paymentsInformation = await Payments.findOne({
      where: { userId: id },
    });
    console.log(paymentsInformation);
    res.status(201).json({ message: messages.authResponse.SUCCESS, data: paymentsInformation });
  } catch (error) {
    if (error instanceof Error) {
      next(new CustomError(error.message, 400));
    }
  }
};
