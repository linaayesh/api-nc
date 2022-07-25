import {
  InferAttributes, InferCreationAttributes, Model, DataTypes,
} from 'sequelize';
import sequelize from '../config/connections';

interface IUploads extends Model<
  InferAttributes<IUploads>, InferCreationAttributes<IUploads>
> {
  id?: number;
  userId: number;
  title: string;
  status: string;
  s3VideoLink: string;
  image1920x1080: string;
  image1070x1585: string;
  image1080x1080: string;
  image1080x1920: string;
  image3840x1080: string;
}

const Uploads = sequelize.define<IUploads>(
  'uploads',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
    },
    s3VideoLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image1920x1080: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image1070x1585: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image1080x1080: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image1080x1920: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image3840x1080: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

export default Uploads;
