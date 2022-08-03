import { Request, Response, NextFunction } from 'express';
import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';
import { constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const RejectedUsers = await Users.findAll({
      where: {
        [Op.and]: [
          { userStatusId: 2 },
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
    res.json({ message: constants.messages.listOfUsers.rejected, data: RejectedUsers });
  } catch (err) {
    next(err);
  }
};
