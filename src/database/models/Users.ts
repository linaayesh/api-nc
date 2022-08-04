import { DataTypes } from 'sequelize';
import Roles from './Roles';
import UserStatus from './Status';
import { IUsers } from '../../interfaces';
import sequelize from '../config/connections';

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
    userRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Roles,
        key: 'id',
      },
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
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
    userStatusId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: UserStatus,
        key: 'id',
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reasonOfRejection: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  },
);

export default Users;
