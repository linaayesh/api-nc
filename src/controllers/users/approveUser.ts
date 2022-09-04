import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../../services';
import {
  constants, CustomError, sendEmail, dto,
} from '../../helpers';

export default async (request: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = dto.generalDTO.userIdDTO(request);
  const {
    MESSAGES, HttpStatus, USER_ROLES, USER_STATUS, EMAIL_TYPE, REDIRECT_URLS,
  } = constants;

  try {
    const user = await getUserById(userId);
    if (!user) throw new CustomError(MESSAGES.authResponse.notExist, HttpStatus.NOT_FOUND);

    user.userStatusId = USER_STATUS.APPROVED;
    user.updatedBy = USER_ROLES.SYSTEM;
    await user.save();

    const { name, email } = user;

    await sendEmail({
      email,
      type: EMAIL_TYPE.APPROVE,
      name,
      redirectURL: REDIRECT_URLS.LOGIN,
    });

    res
      .status(constants.HttpStatus.OK)
      .json({ message: constants.MESSAGES.authResponse.approvedUser });
  } catch (err) {
    next(err);
  }
};
