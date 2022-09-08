import { Request, Response, NextFunction } from 'express';
import { checkExistence, constants } from '../../helpers';
import { getUserById, getNumberOfContent } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { messages, httpStatus } = constants;
  try {
    const { userId } = request.params;
    const userData = await getUserById(+userId);
    const user = await checkExistence.ApprovalChecks(userData);
    const { totalRevenue, paidRevenue } = user;
    const balance = +totalRevenue - +paidRevenue;
    const Content = await getNumberOfContent(
      { page: 1, limit: 10, userId: Number(userId) },
    );

    response
      .status(httpStatus.OK)
      .json({
        message: messages.authResponse.USER_STATISTICS,
        data: {
          totalRevenue, paidRevenue, balance, Content,
        },
      });
  } catch (error) {
    next(error);
  }
};
