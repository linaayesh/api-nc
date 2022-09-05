import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import {
  constants, checkExistence, signToken, CustomError, dto,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (request: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password, rememberMe } = dto.authDTO.loginDTO(request);
  const { messages, httpStatus } = constants;

  try {
    let expiresIn;
    if (rememberMe) { expiresIn = '30d'; } else { expiresIn = '24h'; }

    const userData = await getUserByEmail(email);

    const user = await checkExistence.ApprovalChecks(userData);

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new CustomError(
        messages.authResponse.WRONG_EMAIL_OR_PASSWORD,
        httpStatus.UNAUTHORIZED,
      );
    }

    const { id, name, userRoleId } = user;
    const token = await signToken({
      id: Number(id), name, email, roleId: userRoleId,
    }, { expiresIn });

    res
      .status(httpStatus.OK)
      .cookie(messages.token.ACCESS_TOKEN, token, { httpOnly: true })
      .json({
        message: messages.authResponse.SUCCESS_LOGIN,
        payload: {
          id: Number(id), name, email, roleId: userRoleId,
        },
      });
  } catch (error) {
    next(error);
  }
};
