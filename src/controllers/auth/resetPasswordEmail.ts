import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import { constants, verifyToken, tokenError } from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { notExist } = constants.messages.authResponse;
  const { REDIRECT } = constants.HttpStatus;
  const token: string = req.params?.token;

  try {
    const { email } = await verifyToken(token);

    const lowerCaseEmail = email.toLowerCase();

    const userExists = await getUserByEmail(lowerCaseEmail);
    if (!userExists) res.json({ message: notExist });

    res.status(REDIRECT).redirect(`${config.server.CLIENT_URL}/resetPassword`);
  } catch (error) {
    next(tokenError(error as Error));
  }
};
