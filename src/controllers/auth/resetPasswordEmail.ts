import { Request, Response, NextFunction } from 'express';
import { verifyToken, tokenError } from '../../utilities';
import config from '../../config';
import { constants } from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { notExist } = constants.messages.authResponse;
  const token: string = req.params?.token;

  try {
    const { email } = await verifyToken(token);

    const userExists = await getUserByEmail(email);
    if (!userExists) res.json({ message: notExist });

    return res.redirect(`${config.server.CLIENT_URL}/resetPassword`);
  } catch (error) {
    return next(tokenError(error as Error));
  }
};
