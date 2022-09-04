import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import {
  constants, checkExistence, signToken, CustomError, dto,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (req: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password, rememberMe } = dto.authDTO.loginDTO(req);

  const { wrongEmailOrPassword, logIn } = constants.MESSAGES.authResponse;
  const { accessToken } = constants.MESSAGES.token;
  const { OK, UNAUTHORIZED } = constants.HttpStatus;

  try {
    let expiresIn;
    if (rememberMe) { expiresIn = '30d'; } else { expiresIn = '24h'; }

    const userData = await getUserByEmail(email);

    const user = await checkExistence.ApprovalChecks(userData);

    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError(wrongEmailOrPassword, UNAUTHORIZED);

    const { id, name, userRoleId } = user;
    const token = await signToken({
      id: Number(id), name, email, roleId: userRoleId,
    }, { expiresIn });

    res
      .status(OK)
      .cookie(accessToken, token, { httpOnly: true })
      .json({
        message: logIn,
        payload: {
          id: Number(id), name, email, roleId: userRoleId,
        },
      });
  } catch (error) {
    next(error);
  }
};
