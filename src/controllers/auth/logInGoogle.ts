import { Request, Response, NextFunction } from 'express';
import {
  checkExistence, constants, validateError, signToken, googleAuthentication,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { tokenId } = body;
  try {
    const { logIn } = constants.MESSAGES.authResponse;
    const { accessToken } = constants.MESSAGES.token;

    const {
      email, googleId,
    } = await googleAuthentication(tokenId);

    const userData = await getUserByEmail(email);

    const user = await checkExistence.ApprovalChecks(userData);

    if (user.googleId !== googleId) res.status(401).json({ message: 'unAuthorized test' });

    const { id, name, userRoleId } = user;

    const token = await signToken({
      id: Number(id), name, email, roleId: userRoleId,
    }, { expiresIn: '24h' });

    res.status(200).cookie(accessToken, token, { httpOnly: true }).json({
      message: logIn,
      payload: {
        id: Number(id), name, email, roleId: userRoleId,
      },
    });
  } catch (error) {
    next(validateError(error as Error));
  }
};
