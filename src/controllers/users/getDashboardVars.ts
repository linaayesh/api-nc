import { Request, Response, NextFunction } from 'express';
import { getDashboardVars } from '../../services';

export default async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getDashboardVars();

    res.json({ data });
  } catch (error) {
    next(error);
  }
};
