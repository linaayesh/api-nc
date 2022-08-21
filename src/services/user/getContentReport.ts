import { Content, ContentReport } from 'db-models-nc';
import { ICustomContent } from '../../interfaces';

type IGetPaginatedContents = (_: { page: number, limit: number, userId: number }) => Promise<
  { rows: ICustomContent[]; count: number; }
>

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
          'contentId',
          'reportId',
          'watchedSeconds',
          'revenue',
          'createdBy',
          'updatedBy',
          'tvodTicketsCount',
          'tvodSeconds',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
      },
    ],
  });
};

export default getNumberOfContent;
