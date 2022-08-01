import { NextFunction, Request, Response } from 'express';
import {
  emailValidation, validateError, signToken, sendEmail,
} from '../../utilities';
import config from '../../config';
import { constants, checkExistence } from '../../helpers';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { resetToken } = constants.messages.token;
  const { emailCheck } = constants.messages.check;
  try {
    await emailValidation.validateAsync(body);

    const user = await checkExistence.ApprovalChecks(body.email);

    const {
      username, email, roleId, id,
    } = user;
    const token = await signToken({
      id: Number(id),
      username,
      email,
      roleId,
    }, { expiresIn: '1h' });
    await sendEmail(email, 'Forget Password', `<h1>Welcome, ${username}!</h1><p>
    To change your password , click here:
    <a href="${config.server.serverURL}/auth/reset-password/${token}">Change Password</a>
    Verification codes expire after 1 hour.
    If you did not request this change, please ignore this message.
    <br />
    Best Regards,
    <br />
    NextUp Comedy team</p>`);
    res
      .cookie(resetToken, token)
      .status(201)
      .json({ message: emailCheck });
  } catch (err) {
    next(validateError(err as Error));
  }
};
