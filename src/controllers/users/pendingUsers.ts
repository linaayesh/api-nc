import { Response, NextFunction, Request } from 'express';
import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';
import { messages } from '../../helpers/constants';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    // TODO: edit user status id
    const pendingUsers = await Users.findAll({
      where: {
        [Op.and]: [
          { userStatusId: 1 },
          { userRoleId: { [Op.ne]: 1 } },
        ],
      },
      attributes: {
        exclude: ['password', 'updatedAt'],
        include: [[col('role.name'), 'roleName']],
      },
      include: {
        model: Roles,
        attributes: [],
      },
    });
    res.json({ message: messages.listOfUsers.notApproved, data: pendingUsers });
  } catch (err) {
    next(err);
  }
};
