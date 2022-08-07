import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import {
  constants, checkExistence, signToken, sendEmail,
} from '../../helpers';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { resetToken } = constants.messages.token;
  const { emailCheck } = constants.messages.check;
  try {
    const user = await checkExistence.ApprovalChecks(body.email);

    const {
      username, email, userRoleId, id,
    } = user;
    const token = await signToken({
      id: Number(id),
      username,
      email,
      userRoleId,
    }, { expiresIn: '1h' });

    const redirectURL = `${config.server.SERVER_URL}/api/v1/auth/reset-password/${token}`;

    await sendEmail({
      email,
      type: 'reset',
      username,
      redirectURL,
    });

    res
      .cookie(resetToken, token)
      .status(201)
      .json({ message: emailCheck });
  } catch (err) {
    next(err);
  }
};
