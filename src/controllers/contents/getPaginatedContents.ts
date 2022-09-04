import { Request, Response, NextFunction } from 'express';
import { dto, constants } from '../../helpers';
import { getUnmatchedContent } from '../../services';

export default async (request: Request, res: Response, next: NextFunction): Promise<void> => {
  const paginationData = dto.generalDTO.paginationDTO(request);

  try {
    const data = await getUnmatchedContent(paginationData);

    res.json({ message: constants.MESSAGES.authResponse.SUCCESS, data });
  } catch (err) {
    next(err);
  }
};
