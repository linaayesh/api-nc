import { Request, Response, NextFunction } from 'express';
import { getUsers } from '../../services';

export default async ({ query }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { page, limit } = query;

  try {
    const data = await getUsers({ page: Number(page), limit: Number(limit) });

    res.json({ data });
  } catch (err) {
    next(err);
  }
};
