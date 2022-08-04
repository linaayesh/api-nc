import { Request, Response, NextFunction } from 'express';
import { Op, col } from 'sequelize';
import { Users, Roles } from '../../database/models';
import { messages } from '../../helpers/constants';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    // TODO: status Id
    console.log('first');
    const ApprovedUsers = await Users.findAll(
      {
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
      },
    );
    res.json({ message: messages.listOfUsers.approved, data: ApprovedUsers });
  } catch (err) {
    next(err);
  }
};
