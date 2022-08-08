import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import {
  constants, checkExistence, signToken, CustomError,
} from '../../helpers';

export default async ({ body }: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password, rememberMe } = body;
  const { wrongEmailOrPassword, logIn } = constants.messages.authResponse;
  const { accessToken } = constants.messages.token;
  const { OK, UNAUTHORIZED } = constants.HttpStatus;
  try {
    let expiresIn;
    if (rememberMe) { expiresIn = '30d'; } else { expiresIn = '24h'; }

    const lowerCaseEmail = email.toLowerCase();

    const user = await checkExistence.ApprovalChecks(lowerCaseEmail);

    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError(wrongEmailOrPassword, UNAUTHORIZED);

    const { id, username, userRoleId } = user;
    const token = await signToken({
      id: Number(id), username, email: lowerCaseEmail, userRoleId,
    }, { expiresIn });

    res
      .status(OK)
      .cookie(accessToken, token, { httpOnly: true })
      .json({
        message: logIn,
        payload: {
          id: Number(id), username, email: lowerCaseEmail, userRoleId,
        },
      });
  } catch (error) {
    next(error);
  }
};
