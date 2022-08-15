import { Request, Response, NextFunction } from 'express';
import { getContentsAndUsersService } from '../../services';

export default async ({ query }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { targetContent } = query;

  try {
    const [contents, users] = await getContentsAndUsersService(targetContent as string);

    res.json({ data: { contents, users } });
  } catch (err) {
    next(err);
  }
};
