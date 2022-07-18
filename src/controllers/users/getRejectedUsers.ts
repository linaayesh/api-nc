import { Request, Response, NextFunction } from 'express';
import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const RejectedUsers = await Users.findAll({
      where: {
        [Op.and]: [
          { isVerified: true, isRejected: true },
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
    res.json({ message: 'List of rejected users', data: RejectedUsers });
  } catch (err) {
    next(err);
  }
};
