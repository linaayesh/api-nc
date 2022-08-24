import { Content, ContentReport } from 'db-models-nc';

import { ICustomContent } from '../../interfaces';

type IGetPaginatedContents = (_: {
  page: number;
  limit: number;
  userId: number;
}) => Promise<{ rows: ICustomContent[]; count: number }>;

const getNumberOfContent: IGetPaginatedContents = ({ page, limit, userId }) => {
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
      'freeToBePaid',
      'feePaid',
      'filmingCosts',
      'recoveredCosts',
      'paidToOwedAmount',
      'primaryCategory',
    ],

  });
};

export default getNumberOfContent;
