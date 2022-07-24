import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface ITags extends Model<
  InferAttributes<ITags>, InferCreationAttributes<ITags>
> {
  id?: number;
  name: string;
}

const Tags = sequelize.define<ITags>(
  'tags',
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
  },
  { timestamps: false },
);

export default Tags;
