import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import { getUserById } from '../../services';
import { constants, CustomError, sendEmail } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;
  const redirectURL = `${config.server.CLIENT_URL}/faq`; // TODO: to be modified with FAQ page
  const contactUs = `mailto:${config.email.NEXTUP_COMEDY_SUPPORT_EMAIL}`;
  const {
    messages, HttpStatus, USER_ROLES, USER_STATUS,
  } = constants;

  try {
    const user = await getUserById(+userId);
    if (!user) throw new CustomError(messages.authResponse.notExist, HttpStatus.NOT_FOUND);

    user.userStatusId = USER_STATUS.REJECTED;
    user.updatedBy = USER_ROLES.SYSTEM;
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
