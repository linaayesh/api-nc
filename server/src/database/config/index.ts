import {
  Users,
  Uploads,
  Roles,
  UploadsTags,
  UploadsCategories,
  Tags,
  Categories,
} from '../models';
import sequelize from './connections';

// Users - Users (Venues) relationship
Users.belongsToMany(Users, { through: 'UserVenues', as: 'venues' });

// Users - Uploads relationship
Users.hasMany(Uploads);
Uploads.belongsTo(Users);

// Users - Roles relationship
Roles.hasMany(Users);
Users.belongsTo(Roles);

// Uploads - Tags relationship
Uploads.belongsToMany(Tags, { through: UploadsTags });
Tags.belongsToMany(Uploads, { through: UploadsTags });
Uploads.hasMany(UploadsTags);
UploadsTags.belongsTo(Uploads);
Tags.hasMany(UploadsTags);
UploadsTags.belongsTo(Tags);

// Uploads - Categories relationship
Uploads.belongsToMany(Categories, { through: UploadsCategories });
Categories.belongsToMany(Uploads, { through: UploadsCategories });
Uploads.hasMany(UploadsCategories);
UploadsCategories.belongsTo(Uploads);
Categories.hasMany(UploadsCategories);
UploadsCategories.belongsTo(Categories);

export {
  Users,
  Uploads,
  Roles,
  UploadsTags,
  UploadsCategories,
  Tags,
  Categories,
  sequelize,
};
