import { Request, Response, NextFunction } from 'express';
import { constants, dto } from '../../helpers';
import { getUsersStatus } from '../../services';

export default async (request: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { USER_STATUS, MESSAGES, HttpStatus } = constants;
  const { page, limit } = dto.generalDTO.paginationDTO(request);

  try {
    const RejectedUsers = await getUsersStatus(USER_STATUS.REJECTED, {
      page, limit,
    });

    res
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.listOfUsers.rejected, data: RejectedUsers });
  } catch (error) {
    next(error);
  }
};
