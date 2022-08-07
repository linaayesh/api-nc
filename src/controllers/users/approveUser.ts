import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import { checkExistence, constants, sendEmail } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;
  const redirectURL = `${config.server.CLIENT_URL}`;

  try {
    const user = await checkExistence.VerificationChecks(+userId);
    // TODO: edit status id
    user.userStatusId = 1;
    await user.save();

    const { username, email } = user;

    await sendEmail({
      email, type: 'approve', username, redirectURL,
    });

    res
      .status(201)
      .json({ message: constants.messages.authResponse.adminApproval });
  } catch (err) {
    next(err);
  }
};
