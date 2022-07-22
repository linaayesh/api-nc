import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  CustomError,
  validateError,
  verifyToken,
} from '../../utilities';
import config from '../../config';
import { constants, CheckUserExistence } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { password } = req.body;
  const { resetPasswordToken } = req.cookies;
  const { resetToken } = constants.messages.token;
  const { unAuthUser, resetPassword } = constants.messages.authResponse;
  const { logInCheck } = constants.messages.check;

  try {
    if (!resetPasswordToken) throw new CustomError(unAuthUser, 401);

    const { email } = await verifyToken(resetPasswordToken);

    const userData = await CheckUserExistence(email, logInCheck);

    const hashedPassword = await hash(password, 10);
    userData.password = hashedPassword;
    await userData.save();

    res.status(200).clearCookie(resetToken).json({
      message: { message: resetPassword },
      redirect: `${config.server.clientURL}/login`,
    });
  } catch (err) {
    next(validateError(err as Error));
  }
};
