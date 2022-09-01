import { Request, Response, NextFunction } from 'express';
import { getDashboardSettings } from '../../services';

export default async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getDashboardSettings();
    const newData = { ...data.regularVariables, ...data.encryptedVariables };
    console.log(newData);

    res.json({
      data: newData,
    });
  } catch (error) {
    next(error);
  }
};
