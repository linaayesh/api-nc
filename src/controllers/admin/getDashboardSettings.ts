import { Request, Response, NextFunction } from 'express';
import { getDashboardSettings } from '../../services';
import { constants } from '../../helpers';

export default async (_request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getDashboardSettings();
    const { regularVariables, encryptedVariables } = data;
    const dashboardSettings = { ...regularVariables, ...encryptedVariables };
    response
      .json({
        message: constants.messages.authResponse.SUCCESS,
        data: dashboardSettings,
      });
  } catch (error) {
    next(error);
  }
};
