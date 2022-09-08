import { Request, Response, NextFunction } from 'express';
import { matchUserContent } from '../../services';
import { constants, dto, CustomError } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const data = dto.contentDTO.matchUserContentDTO(request);
  const totalCost = data.filmingCosts + data.advance + data.feePaid;

  try {
    if (data.recoveredCosts > totalCost) throw new CustomError("Recovered costs can't be greater than costs", constants.httpStatus.BAD_REQUEST);
    const content = await matchUserContent(data);

    response
      .json({ message: constants.messages.authResponse.SUCCESS, data: content });
  } catch (error) {
    next(error);
  }
};
