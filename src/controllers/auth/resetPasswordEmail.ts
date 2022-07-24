import { Request, Response, NextFunction } from 'express';
import { Users } from '../../database/models';
import { verifyToken, tokenError } from '../../utilities';
import config from '../../config';
import { constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { resetPassword, notExist } = constants.messages.authResponse;
  const token: string = req.params?.token;

  try {
    const { email } = await verifyToken(token);

    const userExists = await Users.findOne({ where: { email } });
    if (!userExists) res.json({ message: notExist });

    res.status(302).redirect(`${config.server.clientURL}/resetPassword`);
    res.json({ message: resetPassword });
  } catch (error) {
    next(tokenError(error as Error));
  }
};
