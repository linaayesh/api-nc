import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import { checkExistence, constants, sendEmail } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;
  const redirectURL = `${config.server.CLIENT_URL}/faq`; // TODO: to be modified with FAQ page
  const contactUs = `mailto:${config.email.NEXTUP_COMEDY_SUPPORT_EMAIL}`;

  try {
    const user = await checkExistence.VerificationChecks(+userId);

    user.userStatusId = 3;
    await user.save();

    const { username, email } = user;

    const lowerCaseEmail = email.toLowerCase();

    await sendEmail({
      email: lowerCaseEmail, type: 'reject', username, redirectURL, contactUs,
    });

    res
      .status(201)
      .json({ message: constants.messages.check.emailCheck });
  } catch (err) {
    next(err);
  }
};
