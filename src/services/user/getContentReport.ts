import { Content, ContentReport } from 'db-models-nc';
import { IGetContentReportDTO } from '../../helpers/dto/services';

const getNumberOfContent: IGetContentReportDTO = ({ page, limit, userId }) => {
  const offset = (page - 1) * limit;

  return Content.findAndCountAll({
    offset,
    limit,
    where: { userId },
    include: [
      {
        model: ContentReport,
        as: 'contentReports',
        limit: 1,
        order: [['createdAt', 'DESC']],
        attributes: [
          'id',
          'watchedSeconds',
          'revenue',
          'tvodTicketsCount',
          'tvodSeconds',
          'owedRevenue',
        ],
      },
    ],

    attributes: [
      'title',
      'runtime',
      'publishDate',
      'permalink',
      'advance',
      'launchDate',
      'nextUpAccRevenue',
      'owedAccRevenue',
      'feePaid',
      'filmingCosts',
      'recoveredCosts',
      'primaryCategory',
    ],

  });
};

export default getNumberOfContent;
