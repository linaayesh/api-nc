import { Request, Response, NextFunction } from 'express';
import { matchUserContent } from '../../services';
import { constants } from '../../helpers';

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

    res.json({ message: constants.MESSAGES.authResponse.SUCCESS, data: content });
  } catch (err) {
    next(err);
  }
};
