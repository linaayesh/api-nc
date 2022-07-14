import { Request, Response, NextFunction } from 'express';
import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const ApprovedUsers = await Users.findAll(
      {
        where: {
          [Op.and]: [
            { isApproved: true },
            { roleId: { [Op.ne]: 1 } },
          ],
        },
        attributes: {
          exclude: ['password', 'updatedAt', 'createdAt'],
          include: [[col('role.name'), 'roleName']],
        },
        include: {
          model: Roles,
          attributes: [],
        },
      },
    );
    res.json({ message: 'List of all approved users', data: ApprovedUsers });
  } catch (err) {
    next(err);
  }
};
