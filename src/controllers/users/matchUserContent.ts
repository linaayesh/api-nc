import { Request, Response, NextFunction } from 'express';
import { matchUserContent } from '../../services';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } = req;
  const modifiedBody = {
    ...body,
    filmingCosts: body.filmingCosts.toString(),
    advance: body.advance.toString(),
    feePaid: body.feePaid.toString(),
  };

  try {
    const content = await matchUserContent(modifiedBody);

    res.json({ data: content, message: 'Content matched successfully' });
  } catch (err) {
    next(err);
  }
};
