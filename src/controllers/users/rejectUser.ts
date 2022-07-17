/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Users } from '../../database/models';
import {
  idValidation, validateError, sendEmail,
} from '../../utilities';

export default async (req: Request, res: Response)
:Promise<Record<any, any>> => {
  const { userId } = req.params;

  try {
    await idValidation.validateAsync({ userId });
    console.log(userId);
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) return res.json({ message: 'User does not exist.' });
    if (user.isRejected) return res.json({ message: 'User is Already rejected.' });
    user.isRejected = true;
    await user.save();

    const { username, email } = user;
    await sendEmail(email, 'NextUp Comedy', `<h1>Welcome, ${username}!</h1><p>Sorry to form you that your application has been rejected, if you need more information  <a href="mailto:support@nextupcomedy.com" >contact us</a>.</p>`);
    return res
      .status(201)
      .json({ message: 'Rejected account successfully' });
  } catch (err) {
    return validateError(err as Error);
  }
};
