import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  constants, checkExistence, CustomError,
  verifyToken, tokenError, dto,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (request: Request, res: Response, next: NextFunction):Promise<void> => {
  const { password, resetPasswordToken } = dto.authDTO.resetPasswordDTO(request);
  const {
    MESSAGES, HttpStatus, SALT_ROUNDS, REDIRECT_URLS,
  } = constants;

  try {
    if (!resetPasswordToken) {
      throw new CustomError(MESSAGES.authResponse.unAuthUser, HttpStatus.UNAUTHORIZED);
    }

    const { email } = await verifyToken(resetPasswordToken);

    const lowerCaseEmail = email.toLowerCase();

    const user = await getUserByEmail(lowerCaseEmail);

    const userData = await checkExistence.ApprovalChecks(user);

    const hashedPassword = await hash(password, SALT_ROUNDS);
    userData.password = hashedPassword;
    await userData.save();

    res.status(HttpStatus.OK).clearCookie(MESSAGES.token.resetToken).json({
      message: { message: MESSAGES.authResponse.resetPassword },
      redirect: REDIRECT_URLS.LOGIN,
    });
  } catch (err) {
    next(tokenError(err as Error));
  }
};
