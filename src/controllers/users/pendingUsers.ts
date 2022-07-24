import { Request, Response, NextFunction } from 'express';
import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';
import { userStatus, messages } from '../../helpers/constants';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const pendingUsers = await Users.findAll({
      where: {
        [Op.and]: [
          { isVerified: true, status: userStatus.pendingStatus },
          { roleId: { [Op.ne]: 1 } },
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
