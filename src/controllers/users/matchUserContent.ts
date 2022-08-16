import { Request, Response, NextFunction } from 'express';
import { matchUserContentSchema } from '../../helpers/validation';
import { matchUserContent } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await matchUserContentSchema.validateAsync(body);

    const content = await matchUserContent(body);
    res.json({ data: content, message: 'Content matched successfully' });
  } catch (err) {
    next(err);
  }
};
