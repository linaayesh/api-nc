import { Request, Response, NextFunction } from 'express';
import { Users } from '../../database/models';
import { verifyToken } from '../../utilities/jwt';
import config from '../../config';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const token: string = req.params?.token;
  try {
    const { id: userId } = await verifyToken(token);
    const userExists = await Users.findOne({ where: { id: userId } });
    if (!userExists) res.json({ message: 'No Data' });
    res.status(302).redirect(`${config.server.clientURL}/resetPassword`);
    res.json({ message: 'You can reset password now' });
  } catch (err) {
    next(err);
  }
};
