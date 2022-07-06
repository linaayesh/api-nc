/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response):void => {
  res.status(400).json({ message: 'Page Not Found' });
};

interface IError extends Error {
  status?: number;
}

const serverError = (err: IError, req: Request, res: Response, _next: NextFunction):void => {
  res.status(err.status || 500).json({ message: err.status ? err.message : 'Internal Server Error' });
};

export { notFound, serverError };
