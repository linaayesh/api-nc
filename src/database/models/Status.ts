import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface IUserStatus extends Model<
  InferAttributes<IUserStatus>, InferCreationAttributes<IUserStatus>
> {
  id?: number;
  name: string;
  createdBy?: number;
  updatedBy?: number;
}

const UserStatus = sequelize.define<IUserStatus>(
  'user_status',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
);

export default UserStatus;
