import { Op, col } from 'sequelize';
import { IUser, User, UserRole } from 'db-models-nc';
import { constants } from '../../helpers';

type GetUsersStatus = (statusId: number) => Promise<IUser[] | null>

const getUsersStatus: GetUsersStatus = (statusId: number) => User.findAll({
  where: {
    [Op.and]: [
      { userStatusId: statusId },
      { userRoleId: { [Op.ne]: constants.USER_ROLES.SYSTEM_ADMIN } },
    ],
  },
  attributes: {
    exclude: ['password', 'updatedAt'],
    include: [[col('user_role.name'), 'roleName']],
  },
  include: {
    model: UserRole,
    attributes: [],
  },
});

export default getUsersStatus;
