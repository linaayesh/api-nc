import { Request, Response, NextFunction } from 'express';
import { User, Content } from 'db-models-nc';
import { USER_ROLES } from '../../helpers/constants';

export default async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [contents, users] = await Promise.all([Content.findAll(), User.findAll({
      attributes: ['id', 'name', 'email', 'image'],
      where: { userRoleId: USER_ROLES.COMEDIAN },
    })]);
    res.json({ data: { contents, users } });
  } catch (err) {
    next(err);
  }
};
