import { Request, Response, NextFunction } from 'express';
import { getUnmatchedContent } from '../../services';

export default async ({ query }: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    page, limit, title, id,
  } = query;

  try {
    const data = await getUnmatchedContent({
      page: Number(page),
      limit: Number(limit),
      title: typeof title === 'string' ? String(title) : undefined,
      id: typeof id === 'string' ? String(id) : undefined,
    });

    res.json({ data });
  } catch (err) {
    next(err);
  }
};
