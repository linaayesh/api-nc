import { Op, col } from 'sequelize';
import { IUser, User, UserRole } from 'db-models-nc';
import { constants } from '../../helpers';

type GetUsersStatus = (statusId: number, _: {
  page: number, limit: number
}) => Promise<{rows: IUser[], count: number}>

const getUsersStatus: GetUsersStatus = (statusId: number, { page, limit }) => {
  const offset = (page - 1) * limit;
  console.log(offset, limit);

  return User.findAndCountAll({
    offset,
    limit,
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
    order: [['id', 'DESC']],
  });
};

export default getUsersStatus;
