import { Request, Response, NextFunction } from 'express';
import { getDashboardSettings } from '../../services';

export default async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getDashboardSettings();
    const { regularVariables, encryptedVariables } = data;
    const dashboardSettings = { ...regularVariables, ...encryptedVariables };
    res.json({
      data: dashboardSettings,
    });
  } catch (error) {
    next(error);
  }
};
