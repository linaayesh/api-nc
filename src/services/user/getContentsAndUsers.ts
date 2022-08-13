import { User, Content } from 'db-models-nc';
import { USER_ROLES } from '../../helpers/constants';
import {
  ICustomInput, ICustomContent,
} from '../../interfaces';

type GetContentsAndUsers = () => Promise<[ICustomContent[], ICustomInput[]]>

const getContentsAndUsersService: GetContentsAndUsers = () => Promise.all([
  Content.findAll({ order: [['createdAt', 'DESC']] }),
  User.findAll({
    order: [['id', 'DESC']],
    attributes: ['id', 'name', 'email', 'image'],
    where: { userRoleId: USER_ROLES.COMEDIAN },
  })]);

export default getContentsAndUsersService;
