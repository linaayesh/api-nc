import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { CheckUserExistence, constants } from '../../helpers';
import {
  loginSchema, signToken, validateError, CustomError,
} from '../../utilities';

export default async ({ body }: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password, rememberMe } = body;
  const { wrongEmailOrPassword, logIn } = constants.messages.authResponse;
  const { logInCheck } = constants.messages.check;
  const { accessToken } = constants.messages.token;
  try {
    await loginSchema.validateAsync(body);
    let expiresIn;
    if (rememberMe) { expiresIn = '30d'; } else { expiresIn = '1h'; }

    const user = await CheckUserExistence(email, logInCheck);

    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError(wrongEmailOrPassword, 400);

    const { id, username, roleId } = user;
    const token = await signToken({
      id: Number(id), username, email, roleId,
    }, { expiresIn });

    res.cookie(accessToken, token, { httpOnly: true }).json({
      message: logIn,
      payload: {
        id: Number(id), username, email, roleId,
      },
    });
  } catch (err) {
    next(validateError(err as Error));
  }
};
