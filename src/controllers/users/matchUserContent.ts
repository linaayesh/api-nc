import { Request, Response, NextFunction } from 'express';
import { matchUserContent } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const content = await matchUserContent(body);

    res.json({ data: content, message: 'Content matched successfully' });
  } catch (err) {
    next(err);
  }
};
