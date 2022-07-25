import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface IRoles extends Model<
  InferAttributes<IRoles>, InferCreationAttributes<IRoles>
> {
  id?: number;
  name: string
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
      type: DataTypes.ENUM('comedian', 'system-admin'),
      allowNull: false,
    },
  },
  { timestamps: false },
);

export default Roles;
