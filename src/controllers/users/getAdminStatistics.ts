import { Request, Response, NextFunction } from 'express';
import { IStatistics, IReports } from '../../interfaces';
import { getAdminStatistics, getPaginatedReports } from '../../services';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { fromDate, page, limit } = request.query;

  try {
    let statistics: IStatistics;
    let reports: IReports;

    if (fromDate) {
      [statistics, reports] = await Promise.all([
        getAdminStatistics({ fromDate: fromDate as string }),
        getPaginatedReports({
          page: Number(page || 1),
          limit: Number(limit || 10),
        }),
      ]);

      response.json({ data: { statistics, reports } });
      return;
    }

    reports = await getPaginatedReports({
      page: Number(page || 1),
      limit: Number(limit || 10),
    });

    response.json({ data: { reports } });
  } catch (error) {
    next(error);
  }
};
