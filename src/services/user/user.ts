import { User } from 'db-models-nc';
import { AddUserInterface } from '../../interfaces';
import { GetUserByEmailDTO, GetUserByIdDTO, AddUserDTO } from '../../helpers/dto/services';

const getUserByEmail: GetUserByEmailDTO = (email: string) => User.findOne({ where: { email } });

const getUserById: GetUserByIdDTO = (id: number) => User.findOne({ where: { id } });

const addUser: AddUserDTO = (data: AddUserInterface) => User.create(data);

export { getUserByEmail, getUserById, addUser };
