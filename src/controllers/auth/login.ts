import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import {
  constants, checkExistence, signToken, CustomError,
} from '../../helpers';
import { getUserByEmail } from '../../services';

interface loginBody {
  rememberMe: string,
  password: string,
  email: string,
}

const loginDTO = (body: loginBody): loginBody => ({
  email: body.email.toLowerCase(),
  password: body.password,
  rememberMe: body.rememberMe,
});

export default async (req: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password, rememberMe } = loginDTO(req.body);

  const { wrongEmailOrPassword, logIn } = constants.MESSAGES.authResponse;
  const { accessToken } = constants.MESSAGES.token;
  const { OK, UNAUTHORIZED } = constants.HttpStatus;

  try {
    let expiresIn;
    if (rememberMe) { expiresIn = '30d'; } else { expiresIn = '24h'; }

    const lowerCaseEmail = email.toLowerCase();

    const userData = await getUserByEmail(lowerCaseEmail);

    const user = await checkExistence.ApprovalChecks(userData);

    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError(wrongEmailOrPassword, UNAUTHORIZED);

    const { id, name, userRoleId } = user;
    const token = await signToken({
      id: Number(id), name, email: lowerCaseEmail, roleId: userRoleId,
    }, { expiresIn });

    res
      .status(OK)
      .cookie(accessToken, token, { httpOnly: true })
      .json({
        message: logIn,
        payload: {
          id: Number(id), name, email: lowerCaseEmail, roleId: userRoleId,
        },
      });
  } catch (error) {
    next(error);
  }
};
