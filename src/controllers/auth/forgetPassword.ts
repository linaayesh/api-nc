import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import {
  constants, checkExistence, signToken, sendEmail,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { resetToken } = constants.messages.token;
  const { emailCheck } = constants.messages.check;
  const { OK } = constants.HttpStatus;
  const { email } = body;
  const lowerCaseEmail = email.toLowerCase();

  try {
    const userData = await getUserByEmail(lowerCaseEmail);

    const user = await checkExistence.ApprovalChecks(userData);

    const {
      name, userRoleId, id,
    } = user;
    const token = await signToken({
      id: Number(id),
      name,
      email: lowerCaseEmail,
      roleId: userRoleId,
    }, { expiresIn: '1h' });

    const redirectURL = `${config.server.SERVER_URL}/api/v1/auth/reset-password/${token}`;

    await sendEmail({
      email: lowerCaseEmail,
      type: 'reset',
      name,
      redirectURL,
    });

    res
      .cookie(resetToken, token)
      .status(OK)
      .json({ message: emailCheck });
  } catch (err) {
    next(err);
  }
};
