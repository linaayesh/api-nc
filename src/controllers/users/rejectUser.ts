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

    user.userStatusId = constants.USER_STATUS.REJECTED;
    user.updatedBy = constants.USER_ROLES.SYSTEM_ADMIN;
    await user.save();

    const { name, email } = user;

    const lowerCaseEmail = email.toLowerCase();

    await sendEmail({
      email: lowerCaseEmail, type: 'reject', name, redirectURL, contactUs,
    });

    res
      .status(constants.HttpStatus.OK)
      .json({ message: constants.messages.check.emailCheck });
  } catch (err) {
    next(err);
  }
};
