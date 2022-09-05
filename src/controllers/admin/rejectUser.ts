import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../../services';
import {
  constants, CustomError, sendEmail, dto,
} from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = dto.generalDTO.userIdDTO(request);
  const {
    messages, httpStatus, userRoles, userStatus, emailType, redirectURLs,
  } = constants;

  try {
    const user = await getUserById(userId);
    if (!user) throw new CustomError(messages.authResponse.NOT_EXIST, httpStatus.NOT_FOUND);

    user.userStatusId = userStatus.REJECTED;
    user.updatedBy = userRoles.SYSTEM;
    await user.save();

    const { name, email } = user;

    await sendEmail({
      email,
      type: emailType.REJECT,
      name,
      redirectURL: redirectURLs.FAQ,
      contactUs: redirectURLs.CONTACT_US,
    });

    response
      .status(constants.httpStatus.OK)
      .json({ message: constants.messages.check.REJECT_EMAIL_CHECK });
  } catch (err) {
    next(err);
  }
};
