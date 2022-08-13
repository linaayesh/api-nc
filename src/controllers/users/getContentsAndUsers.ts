import { Request, Response, NextFunction } from 'express';
import { getContentsAndUsersService } from '../../services';

export default async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [contents, users] = await getContentsAndUsersService();

    res.json({ data: { contents, users } });
  } catch (error) {
    next(error);
  }
};
