import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface ICategories extends Model<
  InferAttributes<ICategories>, InferCreationAttributes<ICategories>
> {
  id?: number;
  name: string;
}

const Categories = sequelize.define<ICategories>(
  'categories',
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

export default Categories;
