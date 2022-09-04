import { NextFunction, Response, Request } from 'express';
import {
  checkExistence, constants, CustomError, dto,
} from '../../helpers';
import { getUserById } from '../../services';

export default async (request: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = dto.generalDTO.userIdDTO(request);
  try {
    const userData = await getUserById(userId);
    const user = await checkExistence.ApprovalChecks(userData);
    const { USER_STATUS, HttpStatus, MESSAGES } = constants;

    if (!user) {
      throw new CustomError(MESSAGES.authResponse.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    user.userStatusId = USER_STATUS.BANNED;
    user.updatedBy = user.id;
    await user.save();

    res
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.authResponse.SUCCESS });
  } catch (err) {
    next(err);
  }
};
