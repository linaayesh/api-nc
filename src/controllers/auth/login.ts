import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import {
  constants, checkExistence, signToken, CustomError,
} from '../../helpers';
import { getUserByEmail } from '../../services';

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

    const userData = await getUserByEmail(lowerCaseEmail);

    const user = await checkExistence.ApprovalChecks(userData);

    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError(wrongEmailOrPassword, UNAUTHORIZED);

    const {
      id, name, userRoleId, image,
    } = user;
    const token = await signToken({
      id: Number(id), name, email: lowerCaseEmail, roleId: userRoleId,
    }, { expiresIn });

    res
      .status(OK)
      .cookie(accessToken, token, { httpOnly: true })
      .json({
        message: logIn,
        payload: {
          name,
          image,
          email: lowerCaseEmail,
          roleId: userRoleId,
          id: Number(id),
        },
      });
  } catch (error) {
    next(error);
  }
};
