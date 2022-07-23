import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { constants, checkExistence } from '../../helpers';
import {
  loginSchema, signToken, validateError, CustomError,
} from '../../utilities';

export default async ({ body }: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password, rememberMe } = body;
  const { wrongEmailOrPassword, logIn } = constants.messages.authResponse;
  const { accessToken } = constants.messages.token;
  try {
    await loginSchema.validateAsync(body);
    let expiresIn;
    if (rememberMe) { expiresIn = '30d'; } else { expiresIn = '1h'; }

    const user = await checkExistence.ApprovalChecks(email);

    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError(wrongEmailOrPassword, 401);

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
