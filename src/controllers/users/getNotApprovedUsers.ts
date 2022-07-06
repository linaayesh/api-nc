import { Request, Response, NextFunction } from 'express';
import { Users } from '../../database/models';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const NotApprovedUsers = await Users.findAll({ where: { isApproved: false } });
    res.json({ message: 'List of nonApproved users', data: NotApprovedUsers });
  } catch (err) {
    next(err);
  }
};
