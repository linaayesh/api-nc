import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import { checkExistence, constants, sendEmail } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;
  const redirectURL = `${config.server.CLIENT_URL}`;

  try {
    const user = await checkExistence.VerificationChecks(+userId);

    user.userStatusId = constants.USER_STATUS.APPROVED;
    user.updatedBy = constants.USER_ROLES.SYSTEM;
    await user.save();

    const { name, email } = user;

    const lowerCaseEmail = email.toLowerCase();

    await sendEmail({
      email: lowerCaseEmail, type: 'approve', name, redirectURL,
    });

    res
      .status(constants.HttpStatus.OK)
      .json({ message: constants.messages.authResponse.adminApproval });
  } catch (err) {
    next(err);
  }
};
