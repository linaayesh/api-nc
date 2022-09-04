import { NextFunction, Request, Response } from 'express';
import {
  constants, checkExistence, sendEmail, dto,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const {
    MESSAGES, HttpStatus, EMAIL_TYPE, REDIRECT_URLS,
  } = constants;

  const { email } = dto.authDTO.forgetPasswordDTO(req);

  try {
    const userData = await getUserByEmail(email);

    const user = await checkExistence.ApprovalChecks(userData);

    await sendEmail({
      email,
      type: EMAIL_TYPE.RESET,
      name: user.name,
      redirectURL: REDIRECT_URLS.RESET,
    });

    res
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.check.RESET_EMAIL_CHECK });
  } catch (err) {
    next(err);
  }
};
