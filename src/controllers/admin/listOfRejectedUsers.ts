import { Request, Response, NextFunction } from 'express';
import { constants, dto } from '../../helpers';
import { getUsersStatus } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { userStatus, messages, httpStatus } = constants;
  const { page, limit } = dto.generalDTO.paginationDTO(request);

  try {
    const RejectedUsers = await getUsersStatus(userStatus.REJECTED, {
      page, limit,
    });

    response
      .status(httpStatus.OK)
      .json({ message: messages.listOfUsers.REJECTED, data: RejectedUsers });
  } catch (error) {
    next(error);
  }
};
