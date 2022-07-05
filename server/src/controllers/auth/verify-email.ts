import { Request, Response, NextFunction } from 'express';
import { Users } from '../../database/models';
import { verifyToken } from '../../utilities/jwt';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const token: string | undefined = req.params?.token;

  try {
    const { id: userId } = await verifyToken(token);

    const userExists = await Users.findOne({ where: { id: userId } });
    if (!userExists) res.json({ message: 'No data' });
    const [userVerified] = await Users.update({ isVerified: true }, { where: { id: userId } });
    if (userVerified) {
      res.status(302).redirect('http://localhost:3000');
    } else {
      res.json({ message: 'User already verified' });
    }
  } catch (err) {
    next(err);
  }
};
