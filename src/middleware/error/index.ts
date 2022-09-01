import { NextFunction, Request, Response } from 'express';
import { constants } from '../../helpers';

const notFound = (_req: Request, res: Response):void => {
  res.status(constants.HttpStatus.BAD_REQUEST).json({ message: constants.ERROR_RESPONSE.CLIENT });
};

interface IError extends Error {
  status?: number;
}

const serverError = (err: IError, req: Request, res: Response, _next: NextFunction):void => {
  console.log(err);
  res
    .status(err.status || constants.HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.status ? err.message : constants.ERROR_RESPONSE.SERVER });
};

export { notFound, serverError };
