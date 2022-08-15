import {
  Op,
  col,
} from 'sequelize';
import { IUser, User, UserRole } from 'db-models-nc';
import { constants } from '../../helpers';

type GetUsersStatus = (statusId: number) => Promise<IUser[] | null>

const getUsersStatus: GetUsersStatus = (statusId: number) => User.findAll({
  where: {
    [Op.and]: [
      { userStatusId: statusId },
      {
        userRoleId: {
          [Op.notIn]: [
            constants.USER_ROLES.MASTER_ADMIN,
            constants.USER_ROLES.SYSTEM,
          ],
        },
      },
    ],
  },
  attributes: {
    exclude: ['password', 'updatedAt'],
    include: [[col('userRole.name'), 'roleName']],
  },
  include: {
    model: UserRole,
    as: 'userRole',
    attributes: [],
  },
});

export default getUsersStatus;
