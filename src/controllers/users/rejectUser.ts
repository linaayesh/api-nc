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
  const redirectURL = `${config.server.clientURL}/faq`; // TODO: to be modified with FAQ page
  const contactUs = config.server.NEXTUP_COMEDY_SUPPORT_EMAIL;

  try {
    await idValidation.validateAsync({ userId });
    const user = await Users.findOne({ where: { id: userId, isVerified: true } });
    if (!user) return res.json({ message: 'User does not exist.' });
    if (user.isRejected) return res.json({ message: 'User is Already rejected.' });
    user.isRejected = true;
    await user.save();
    const { username, email } = user;

    await sendEmail({
      email, type: 'reject', username, redirectURL, contactUs,
    });

    return res
      .status(201)
      .json({ message: 'Rejected account successfully' });
  } catch (err) {
    return validateError(err as Error);
  }
};
