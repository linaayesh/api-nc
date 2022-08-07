import { Users } from '../../database/models';
import { IUsers } from '../../interfaces';

interface AddUserInterface{
  username: string,
  email:string
  password: string,
  userRoleId:number
  createdBy: number,
  image?: string,
  googleId?: string,
}

type GetUserByEmail = (email: string) => Promise<IUsers | null>
type GetUserById = (id: number) => Promise<IUsers | null>
type AddUser = (data: AddUserInterface) => Promise<IUsers>

const getUserByEmail: GetUserByEmail = (email: string) => Users.findOne({ where: { email } });

const getUserById: GetUserById = (id: number) => Users.findOne({ where: { id } });

const addUser: AddUser = (data: AddUserInterface) => Users.create(data);

export { getUserByEmail, getUserById, addUser };
