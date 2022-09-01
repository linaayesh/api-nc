import { Request, Response, NextFunction } from 'express';
import { getDashboardSettings } from '../../services';

export default async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getDashboardSettings();

    res.json({ data });
  } catch (error) {
    next(error);
  }
};
