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
<<<<<<< HEAD
      { userRoleId: { [Op.ne]: constants.USER_ROLES.SYSTEM } },
=======
      {
        userRoleId: {
          [Op.notIn]: [
            constants.USER_ROLES.MASTER_ADMIN,
            constants.USER_ROLES.SYSTEM,
          ],
        },
      },
>>>>>>> 8023bce83c01023f5b5b6e97afb000dce02e475c
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
