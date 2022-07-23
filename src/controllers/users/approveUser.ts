import { NextFunction, Request, Response } from 'express';
import {
  idValidation, validateError, sendEmail,
} from '../../utilities';
import config from '../../config';
import { checkExistence, constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;

  try {
    await idValidation.validateAsync({ userId });

    const user = await checkExistence.VerificationChecks(+userId);

    user.isApproved = true;
    await user.save();
    const { username, email } = user;
    await sendEmail(email, 'Welcome to NextUp Comedy', `<h1>Welcome, ${username}!</h1><p>Your account has been approved you are free to log in <a href="${config.server.clientURL}/">this link</a> to log in.</p>`);
    res
      .status(201)
      .json({ message: constants.messages.check.emailCheck });
  } catch (err) {
    next(validateError(err as Error));
  }
};
