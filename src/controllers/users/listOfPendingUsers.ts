import { Response, NextFunction, Request } from 'express';
import { getUsersStatus } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { MESSAGES, USER_STATUS, HttpStatus } = constants;
  const { page, limit } = dto.generalDTO.paginationDTO(request);
  try {
    const pendingUsers = await getUsersStatus(USER_STATUS.PENDING, {
      page: Number(page), limit: Number(limit),
    });

    res
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.listOfUsers.notApproved, data: pendingUsers });
  } catch (error) {
    next(error);
  }
};
