import { Content } from 'db-models-nc';
import { ICustomContent } from '../../interfaces';

type IGetPaginatedContents = (_: { page: number, limit: number }) => Promise<
  { rows: ICustomContent[]; count: number; }
>

const getPaginatedContents: IGetPaginatedContents = ({ page, limit }) => {
  const offset = (page - 1) * limit;

  return Content.findAndCountAll({
    offset,
    limit,
    order: [['createdAt', 'DESC']],
  });
};

export default getPaginatedContents;
