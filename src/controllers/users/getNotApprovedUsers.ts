import { Request, Response, NextFunction } from 'express';
import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const NotApprovedUsers = await Users.findAll({
      where: {
        [Op.and]: [
          { isApproved: false },
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
    res.json({ message: 'List of nonApproved users', data: NotApprovedUsers });
  } catch (err) {
    next(err);
  }
};
