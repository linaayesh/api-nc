/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Users } from '../../database/models';
import {
  idValidation, validateError, sendEmail,
} from '../../utilities';
import config from '../../config';

export default async (req: Request, res: Response)
:Promise<Record<any, any>> => {
  const { userId } = req.params;

  try {
    await idValidation.validateAsync({ userId });
    const user = await Users.findOne({ where: { id: userId, isVerified: true } });
    if (!user) return res.json({ message: 'User does not exist.' });
    if (user.isApproved) return res.json({ message: 'User is Already approved.' });
    user.isApproved = true;
    await user.save();
    const { username, email } = user;
    await sendEmail(email, 'Welcome to NextUp Comedy', `<h1>Welcome, ${username}!</h1><p>Your account has been approved you are free to log in <a href="${config.server.clientURL}/">this link</a> to log in.</p>`);
    return res
      .status(201)
      .json({ message: 'Confirmation email sent successfully' });
  } catch (err) {
    return validateError(err as Error);
  }
};
