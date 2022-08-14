import { Op } from 'sequelize';
import { User, Content } from 'db-models-nc';
import { USER_ROLES } from '../../helpers/constants';
import {
  ICustomInput,
  ICustomContent,
} from '../../interfaces';

type GetContentsAndUsers = (_: string) => Promise<[ICustomContent[], ICustomInput[]]>

const getContentsAndUsersService: GetContentsAndUsers = (targetContent) => Promise.all([
  Content.findAll({
    where: targetContent !== 'all' ? { userId: targetContent === 'unmatched' ? { [Op.is]: null } : { [Op.ne]: null } } : undefined,
    order: [['createdAt', 'DESC']],
  }),
  User.findAll({
    order: [['id', 'DESC']],
    attributes: ['id', 'name', 'email', 'image'],
    where: { userRoleId: USER_ROLES.COMEDIAN },
  })]);

export default getContentsAndUsersService;
