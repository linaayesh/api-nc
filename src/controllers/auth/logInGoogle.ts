import { Request, Response, NextFunction } from 'express';
import {
  checkExistence, constants, validateError, signToken, googleAuthentication,
} from '../../helpers';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { tokenId } = body;
  try {
    const { logIn } = constants.messages.authResponse;
    const { accessToken } = constants.messages.token;

    const {
      email, googleId,
    } = await googleAuthentication(tokenId);

    const user = await checkExistence.ApprovalChecks(email);

    if (user.googleId !== googleId) res.status(401).json({ message: 'unAuthorized test' });

    const { id, username, userRoleId } = user;

    const token = await signToken({
      id: Number(id), username, email, userRoleId,
    }, { expiresIn: '24h' });

    res.status(200).cookie(accessToken, token, { httpOnly: true }).json({
      message: logIn,
      payload: {
        id: Number(id), username, email, userRoleId,
      },
    });
  } catch (error) {
    next(validateError(error as Error));
  }
};
