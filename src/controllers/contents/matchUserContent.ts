import { Request, Response, NextFunction } from 'express';
import { matchUserContent } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const data = dto.contentDTO.matchUserContentDTO(request);

  try {
    const content = await matchUserContent(data);

    response
      .json({ message: constants.messages.authResponse.SUCCESS, data: content });
  } catch (error) {
    next(error);
  }
};
