import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  constants, checkExistence, CustomError,
  verifyToken, tokenError,
} from '../../helpers';
import { getUserByEmail } from '../../services';
import config from '../../config';

export default async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { password } = req.body;
  const { resetPasswordToken } = req.cookies;
  const { resetToken } = constants.messages.token;
  const { unAuthUser, resetPassword } = constants.messages.authResponse;
  const { OK } = constants.HttpStatus;

  try {
    if (!resetPasswordToken) throw new CustomError(unAuthUser, 401);

    const { email } = await verifyToken(resetPasswordToken);

    const lowerCaseEmail = email.toLowerCase();

    const user = await getUserByEmail(lowerCaseEmail);

    const userData = await checkExistence.ApprovalChecks(user);

    const hashedPassword = await hash(password, 10);
    userData.password = hashedPassword;
    await userData.save();

    res.status(OK).clearCookie(resetToken).json({
      message: { message: resetPassword },
      redirect: `${config.server.CLIENT_URL}/login`,
    });
  } catch (err) {
    next(tokenError(err as Error));
  }
};
