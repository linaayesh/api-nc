import { Request, Response, NextFunction } from 'express';
import { getUsersStatus } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { MESSAGES, USER_STATUS, HttpStatus } = constants;
  const { page, limit } = dto.generalDTO.paginationDTO(request);
  try {
    const approvedUsers = await getUsersStatus(USER_STATUS.APPROVED, {
      page: Number(page), limit: Number(limit),
    });
    res
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.listOfUsers.approved, data: approvedUsers });
  } catch (err) {
    next(err);
  }
};
