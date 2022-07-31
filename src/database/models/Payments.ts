import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface IPayments extends Model<
  InferAttributes<IPayments>, InferCreationAttributes<IPayments>
> {
  id?: number;
  userId?: number;
  name: string;
  address: string;
  method_id?: number;
  updatedBy?: number;
  createdBy?: number;
}

const Payments = sequelize.define<IPayments>(
  'payments',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
);

export default Payments;
