import { IUser, User } from 'db-models-nc';

const getUserData = async (userId:number): Promise<IUser | null > => {
  const user = await User.findOne({
    where: { id: userId },
    attributes: ['id', 'email', 'name'],

  });
  return user;
};
export default getUserData;
