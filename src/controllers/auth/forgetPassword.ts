import { Request, Response } from 'express';
import { Users } from '../../database/models';
import {
  emailValidation, validateError, signToken, sendEmail,
} from '../../utilities';

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
      roleId,
    });
    await sendEmail(email, 'Forget Password', `<h1>Welcome, ${username}!</h1><p>Your can reset your password by clicking <a href="http://localhost:5000/api/v1/auth/reset-password/${token}">this link</a>.</p>`);
    return res
      .cookie('resetToken', token)
      .status(201)
      .json({ message: 'Check email to Reset password' });
  } catch (err) {
    return validateError(err as Error);
  }
};
