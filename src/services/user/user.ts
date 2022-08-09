import { User, IUser } from 'db-models-nc';
// import { IUserInfo } from '../../interfaces'

interface AddUserInterface{
  name: string;
  email: string;
  password: string;
  userRoleId: number;
  createdBy: number;
  image?: string;
  googleId?: string;
  accPaidRevenue: number;
  freeToBePaidRevenue: number;
  updatedBy?: number;
}

type GetUserByEmail = (email: string) => Promise<IUser | null>
type GetUserById = (id: number) => Promise<IUser | null>
type AddUser = (data: AddUserInterface) => Promise<IUser>

const getUserByEmail: GetUserByEmail = (email: string) => User.findOne({ where: { email } });

const getUserById: GetUserById = (id: number) => User.findOne({ where: { id } });

const addUser: AddUser = (data: AddUserInterface) => User.create(data);

export { getUserByEmail, getUserById, addUser };
