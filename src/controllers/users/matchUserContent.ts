import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../helpers/constants';
import { CustomError } from '../../helpers';
import { matchUserContent } from '../../services';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } = req;
  const totalCost = body.filmingCosts + body.advance + body.feePaid;

  try {
    if (body.recoveredCosts > totalCost) throw new CustomError("Recovered costs can't be greater than costs", HttpStatus.BAD_REQUEST);

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
