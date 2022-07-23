import { Request, Response, NextFunction } from 'express';
import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';
import { constants } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    const ApprovedUsers = await Users.findAll(
      {
        where: {
          [Op.and]: [
            { isApproved: true, isVerified: true },
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
      },
    );
    res.json({ message: constants.messages.listOfUsers.approved, data: ApprovedUsers });
  } catch (err) {
    next(err);
  }
};
