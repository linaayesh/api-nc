import { Response, NextFunction } from 'express';
import { constants } from '../../helpers';
import { getNumberOfContent } from '../../services';
import { UserAuth } from '../../interfaces';

export default async (req: UserAuth, res: Response, next: NextFunction)
:Promise<void> => {
  const { messages, HttpStatus } = constants;
  try {
    //  use a DTO ?
    const { user } = req;
    if (!user) return;
    //
    const { totalRevenue, paidRevenue, id: userId } = user;
    const balance = +totalRevenue - +paidRevenue;
    const Content = await getNumberOfContent(
      { page: 1, limit: 10, userId: Number(userId) },
    );

    res
      .status(HttpStatus.OK)
      .json({
        message: messages.authResponse.userStatistics,
        data: {
          totalRevenue, paidRevenue, balance, Content,
        },
      });
  } catch (error) {
    next(error);
  }
};
