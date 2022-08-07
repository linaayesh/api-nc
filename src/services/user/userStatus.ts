import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';
import { IUsers } from '../../interfaces';

type GetUsersStatus = (statusId: number) => Promise<IUsers[] | null>

const getUsersStatus: GetUsersStatus = (statusId: number) => Users.findAll({
  where: {
    [Op.and]: [
      { userStatusId: statusId },
      { userRoleId: { [Op.ne]: 1 } },
    ],
  },
  attributes: {
    exclude: ['password', 'updatedAt'],
    include: [[col('user_role.name'), 'roleName']],
  },
  include: {
    model: Roles,
    attributes: [],
  },
});

export default getUsersStatus;
