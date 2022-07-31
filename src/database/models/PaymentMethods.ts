import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface IPaymentMethods extends Model<
  InferAttributes<IPaymentMethods>, InferCreationAttributes<IPaymentMethods>
> {
  id?: number;
  name: string;
  updatedBy?: number;
  createdBy?: number;
  userId?: number;
}

const PaymentMethods = sequelize.define<IPaymentMethods>(
  'paymentMethods',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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

export default PaymentMethods;
