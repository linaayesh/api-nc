import {
  DataTypes,
  InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';
import sequelize from '../config/connections';

interface IUploadsTags extends Model<
  InferAttributes<IUploadsTags>, InferCreationAttributes<IUploadsTags>
> {
  tagId?: number;
  uploadId?: number;
}

const UploadsTags = sequelize.define<IUploadsTags>(
  'uploadsTags',
  {
    tagId: {
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

export default UploadsTags;
