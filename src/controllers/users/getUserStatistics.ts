import { Request, Response, NextFunction } from 'express';
import { checkExistence, constants } from '../../helpers';
import { getUserById, getNumberOfContent } from '../../services';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { messages, HttpStatus } = constants;
  try {
    const { userId } = req.params;
    const userData = await getUserById(+userId);
    const user = await checkExistence.ApprovalChecks(userData);
    const { totalRevenue, paidRevenue } = user;
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
