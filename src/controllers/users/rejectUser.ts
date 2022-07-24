import { NextFunction, Request, Response } from 'express';
import {
  idValidation, validateError, sendEmail,
} from '../../utilities';
import { checkExistence, constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;

  try {
    await idValidation.validateAsync({ userId });

    const user = await checkExistence.VerificationChecks(+userId);

    user.status = constants.userStatus.rejectStatus;
    await user.save();

    const { username, email } = user;
    await sendEmail(email, 'NextUp Comedy', `<h1>Welcome, ${username}!</h1><p>Sorry to form you that your application has been rejected, if you need more information  <a href="mailto:support@nextupcomedy.com" >contact us</a>.</p>`);
    res
      .status(201)
      .json({ message: constants.messages.check.emailCheck });
  } catch (err) {
    next(validateError(err as Error));
  }
};
