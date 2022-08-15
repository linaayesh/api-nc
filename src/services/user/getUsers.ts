import { User } from 'db-models-nc';
import { USER_ROLES } from '../../helpers/constants';
import { ICustomUser } from '../../interfaces';

type IGetPaginatedUsers = (_: { page: number, limit: number }) => Promise<
  { rows: ICustomUser[]; count: number; }
>

const getPaginatedUsers: IGetPaginatedUsers = ({ page, limit }) => {
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
