import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../../services';
import config from '../../config';
import { constants, CustomError, sendEmail } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = req.params;
  const redirectURL = `${config.server.CLIENT_URL}`;
  const {
    MESSAGES, HttpStatus, USER_ROLES, USER_STATUS,
  } = constants;

  try {
    const user = await getUserById(+userId);
    if (!user) throw new CustomError(MESSAGES.authResponse.notExist, HttpStatus.NOT_FOUND);

    user.userStatusId = USER_STATUS.APPROVED;
    user.updatedBy = USER_ROLES.SYSTEM;
    await user.save();

    const { name, email } = user;

    const lowerCaseEmail = email.toLowerCase();

    await sendEmail({
      email: lowerCaseEmail, type: 'approve', name, redirectURL,
    });

    res
      .status(constants.HttpStatus.OK)
      .json({ message: constants.MESSAGES.authResponse.approvedUser });
  } catch (err) {
    next(err);
  }
};
