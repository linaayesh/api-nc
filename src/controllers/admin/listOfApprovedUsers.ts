import { Request, Response, NextFunction } from 'express';
import { getUsersStatus } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { messages, userStatus, httpStatus } = constants;
  const { page, limit } = dto.generalDTO.paginationDTO(request);
  try {
    const approvedUsers = await getUsersStatus(userStatus.APPROVED, {
      page: Number(page), limit: Number(limit),
    });
    response
      .status(httpStatus.OK)
      .json({ message: messages.listOfUsers.APPROVED, data: approvedUsers });
  } catch (error) {
    next(error);
  }
};
