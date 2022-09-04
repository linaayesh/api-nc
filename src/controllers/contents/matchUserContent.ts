import { Request, Response, NextFunction } from 'express';
import { matchUserContent } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, res: Response, next: NextFunction): Promise<void> => {
  const data = dto.contentDTO.matchUserContentDTO(request);

  try {
    const content = await matchUserContent(data);

    res.json({ message: constants.MESSAGES.authResponse.SUCCESS, data: content });
  } catch (err) {
    next(err);
  }
};
