import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface IUploadsCategories extends Model<
  InferAttributes<IUploadsCategories>, InferCreationAttributes<IUploadsCategories>
> {
  categoryId?: number;
  uploadId?: number;
}

const UploadsCategories = sequelize.define<IUploadsCategories>(
  'uploadsCategories',
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    uploadId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  { timestamps: false },
);

export default UploadsCategories;
