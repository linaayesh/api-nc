import { Request, Response, NextFunction } from 'express';
import { getContents } from '../../services';

export default async ({ query }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { page, limit } = query;

  try {
    const data = await getContents({ page: Number(page), limit: Number(limit) });

    res.json({ data });
  } catch (err) {
    next(err);
  }
};
