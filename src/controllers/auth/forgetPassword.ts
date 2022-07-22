import { Request, Response } from 'express';
import { Users } from '../../database/models';
import {
  emailValidation, validateError, signToken, sendEmail,
} from '../../utilities';
import config from '../../config';
import { constants } from '../../helpers';

export default async ({ body }: Request, res: Response)
:Promise<Record<string, any>> => {
  const { notExist } = constants.messages.authResponse;
  const { resetToken } = constants.messages.token;
  const { emailCheck } = constants.messages.check;
  try {
    await emailValidation.validateAsync(body);
    const user = await Users.findOne({ where: { email: body.email } });
    if (!user) return res.json({ message: notExist });
    const {
      username, email, roleId, id,
    } = user;
    const token = await signToken({
      id: Number(id),
      username,
      email,
      roleId,
    }, { expiresIn: '1h' });

    const redirectURL = `${config.server.serverURL}/api/v1/auth/reset-password/${token}`;

    await sendEmail({
      email,
      type: 'reset',
      username,
      redirectURL,
    });

    return res
      .cookie(resetToken, token)
      .status(201)
      .json({ message: emailCheck });
  } catch (err) {
    return validateError(err as Error);
  }
};
