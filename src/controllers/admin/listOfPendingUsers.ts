import { Response, NextFunction, Request } from 'express';
import { getUsersStatus } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { messages, userStatus, httpStatus } = constants;
  const { page, limit } = dto.generalDTO.paginationDTO(request);
  try {
    const pendingUsers = await getUsersStatus(userStatus.PENDING, {
      page: Number(page), limit: Number(limit),
    });

    response
      .status(httpStatus.OK)
      .json({ message: messages.listOfUsers.PENDING, data: pendingUsers });
  } catch (error) {
    next(error);
  }
};
