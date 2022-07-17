import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import Role from './Roles';
import sequelize from '../config/connections';

interface IUsers extends Model<
  InferAttributes<IUsers>, InferCreationAttributes<IUsers>
> {
  id?: number;
  username: string;
  email: string;
  password: string;
  googleId?: string;
  roleId?: number;
  accPaidRevenue?: number;
  freeToBePaidRevenue?: number;
  createdBy?: number;
  updatedBy?: number;
  isApproved?: boolean;
  isRejected?: boolean;
}

const Users = sequelize.define<IUsers>(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
    googleId: {
      type: DataTypes.STRING,
    },
    accPaidRevenue: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    freeToBePaidRevenue: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isRejected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
  },
);

export default Users;
