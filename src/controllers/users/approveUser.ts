/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Users } from '../../database/models';
import {
  idValidation, validateError, signToken, sendEmail,
} from '../../utilities';

export default async (req: Request, res: Response)
:Promise<Record<any, any>> => {
  const { userId } = req.params;

  try {
    // create system admin middleware
    await idValidation.validateAsync({ userId });
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) return res.json({ message: 'User does not exist.' });
    if (user.isApproved) return res.json({ message: 'User is Already approved.' });
    user.isApproved = true;
    await user.save();

    const { username, email, roleId } = user;
    const token = await signToken({
      id: Number(userId),
      username,
      email,
      roleId,
    });
    await sendEmail(email, 'Welcome to NextUp Comedy', `<h1>Welcome, ${username}!</h1><p>Your account have been approved click <a href="http://localhost:5000/api/v1/auth/verify-email/${token}">this link</a> to log in.</p>`);
    return res
      .cookie('accessToken', token)
      .status(201)
      .json({ message: 'Confirmation email sent successfully' });
  } catch (err) {
    return validateError(err as Error);
  }
};
