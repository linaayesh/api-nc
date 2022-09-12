import { Request, Response, NextFunction } from 'express';
import { dto, constants } from '../../helpers';
import { getUnmatchedContent } from '../../services';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const paginationData = dto.generalDTO.paginationDTO(request);

  try {
    const data = await getUnmatchedContent(paginationData);

    response
      .json({ message: constants.messages.authResponse.SUCCESS, data });
  } catch (error) {
    next(error);
  }
};
