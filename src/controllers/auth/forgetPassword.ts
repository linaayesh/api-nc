import { Request, Response } from 'express';
import { Users } from '../../database/models';
import {
  emailValidation, validateError, signToken, sendEmail,
} from '../../utilities';
import config from '../../config';

export default async ({ body }: Request, res: Response)
:Promise<Record<any, any>> => {
  try {
    await emailValidation.validateAsync(body);
    const user = await Users.findOne({ where: { email: body.email } });
    if (!user) return res.json({ message: 'User does not exist.' });

    const {
      username, email, roleId, id,
    } = user;
    const token = await signToken({
      id: Number(id),
      username,
      email,
      roleId: roleId || 0,
    }, { expiresIn: '1h' });

    const redirectURL = `${config.server.serverURL}/api/v1/auth/reset-password/${token}`;

    await sendEmail({
      email,
      type: 'reset',
      username,
      redirectURL,
    });

    return res
      .cookie('resetPasswordToken', token)
      .status(201)
      .json({ message: 'Check email to Reset password' });
  } catch (err) {
    return validateError(err as Error);
  }
};
