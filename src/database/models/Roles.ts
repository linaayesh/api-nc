import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface IRoles extends Model<
  InferAttributes<IRoles>, InferCreationAttributes<IRoles>
> {
  id?: number;
  name: string;
  createdBy: number;
  updatedBy: number;
}

const Roles = sequelize.define<IRoles>(
  'roles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default Roles;
