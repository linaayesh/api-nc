import { Op } from 'sequelize';
import { Content } from 'db-models-nc';
import { ICustomContent } from '../../interfaces';

type IGetPaginatedContents = (_: {
  page: number,
  limit: number,
  title: string | undefined
  id: string | undefined
}) => Promise<
  { rows: ICustomContent[]; count: number; } | ICustomContent[] | ICustomContent | null
>

const getUnmatchedContent: IGetPaginatedContents = ({
  page, limit, title, id,
}) => {
  if (!page && !limit) {
    return Content.findAll({
      where: { userId: { [Op.is]: null } },
    });
  }

  const offset = (page - 1) * limit;

  if (!title && !id) {
    return Content.findAndCountAll({
      offset,
      limit,
      where: { userId: { [Op.is]: null } },
    });
  }

  if (title && !id) {
    return Content.findAll({
      where: { title: { [Op.iLike]: `%${title}%` } },
    });
  }

  return Content.findOne({
    where: { id },
  });
};

export default getUnmatchedContent;
