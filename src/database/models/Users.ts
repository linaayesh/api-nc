import { DataTypes } from 'sequelize';
import Role from './Roles';
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
    userStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserStatus,
        key: 'id',
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
