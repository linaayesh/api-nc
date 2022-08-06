import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { constants, checkExistence } from '../../helpers';
import {
  signToken, CustomError,
} from '../../utilities';

export default async ({ body }: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password, rememberMe } = body;
  const { wrongEmailOrPassword, logIn } = constants.messages.authResponse;
  const { accessToken } = constants.messages.token;
  try {
    let expiresIn;
    if (rememberMe) { expiresIn = '30d'; } else { expiresIn = '24h'; }

    const user = await checkExistence.ApprovalChecks(email);

    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError(wrongEmailOrPassword, 401);

    const { id, username, userRoleId } = user;
    const token = await signToken({
      id: Number(id), username, email, userRoleId,
    }, { expiresIn });

    res.cookie(accessToken, token, { httpOnly: true }).json({
      message: logIn,
      payload: {
        id: Number(id), username, email, userRoleId,
      },
    });
  } catch (error) {
    next(error);
  }
};
