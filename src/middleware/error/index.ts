import { NextFunction, Request, Response } from 'express';
import { constants } from '../../helpers';

const notFound = (_req: Request, res: Response):void => {
  res.status(constants.httpStatus.BAD_REQUEST).json({ message: constants.errorResponse.CLIENT });
};

interface IError extends Error {
  status?: number;
}

const serverError = (err: IError, req: Request, res: Response, _next: NextFunction):void => {
  res
    .status(err.status || constants.httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.status ? err.message : constants.errorResponse.SERVER });
};

export { notFound, serverError };
