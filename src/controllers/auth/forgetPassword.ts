import { NextFunction, Request, Response } from 'express';
import {
  constants, checkExistence, sendEmail, dto,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const {
    messages, httpStatus, emailType, redirectURLs,
  } = constants;

  const { email } = dto.authDTO.forgetPasswordDTO(request);

  try {
    const userData = await getUserByEmail(email);

    const user = await checkExistence.ApprovalChecks(userData);

    await sendEmail({
      email,
      type: emailType.RESET,
      name: user.name,
      redirectURL: redirectURLs.RESET,
    });

    response
      .status(httpStatus.OK)
      .json({ message: messages.check.RESET_EMAIL_CHECK });
  } catch (error) {
    next(error);
  }
};
