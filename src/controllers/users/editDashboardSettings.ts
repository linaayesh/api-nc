import { Request, Response, NextFunction } from 'express';
import { editDashboardSettings } from '../../services';
import { constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { viewliftPassword, ...regularVariables } = req.body;

  try {
    const {
      regularVariables: newRegularVariables,
      encryptedVariables,
    } = await editDashboardSettings({ encryptedVariables: { viewliftPassword }, regularVariables });

    res.json({
      message: constants.messages.authResponse.DASHBOARD_VARS_CHANGED,
      data: {
        regularVariables: newRegularVariables,
        encryptedVariables,
      },
    });
  } catch (error) {
    next(error);
  }
};
