import { User } from 'db-models-nc';
import { USER_ROLES } from '../../helpers/constants';
import { ICustomUser } from '../../interfaces';

type IGetPaginatedUsers = (_: { page: number, limit: number }) => Promise<
  { rows: ICustomUser[]; count: number; } | ICustomUser[]
>

const getPaginatedUsers: IGetPaginatedUsers = ({ page, limit }) => {
  if (!page && !limit) {
    return User.findAll({
      where: { userRoleId: USER_ROLES.COMEDIAN },
      attributes: ['id', 'name', 'email', 'image'],
    });
  }

  const offset = (page - 1) * limit;

  return User.findAndCountAll({
    offset,
    limit,
    where: { userRoleId: USER_ROLES.COMEDIAN },
    attributes: ['id', 'name', 'email', 'image'],
    order: [['id', 'DESC']],
  });
};

export default getPaginatedUsers;
