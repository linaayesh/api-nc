import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../helpers';
import { matchUserContent } from '../../services';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } = req;

  try {
    if (body.recoveredCosts > (body.filmingCosts + body.advance + body.feePaid)) throw new CustomError("Recovered costs can't be greater than costs", 400);

    const modifiedBody = {
      ...body,
      filmingCosts: body.filmingCosts.toString(),
      advance: body.advance.toString(),
      feePaid: body.feePaid.toString(),
      recoveredCosts: body.recoveredCosts.toString(),
    };

    const content = await matchUserContent(modifiedBody);

    res.json({ data: content, message: 'Content matched successfully' });
  } catch (err) {
    next(err);
  }
};
