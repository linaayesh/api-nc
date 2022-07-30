import {
  sequelize,
  Users,
  Tags,
  Categories,
  Roles,
  UploadsCategories,
  Uploads,
  UploadsTags,
} from '../config';

import {
  users,
  tags,
  categories,
  uploads,
  uploadsCategories,
  uploadsTags,
  roles,
} from './fakeData';

const { NODE_ENV } = process.env;

const buildFakeData = async ():Promise<void> => {
  await sequelize.sync({ force: true });

  await Promise.all([
    await Roles.bulkCreate(roles),
    await Tags.bulkCreate(tags),
    await Categories.bulkCreate(categories),
  ]);
  await Promise.all([
    await Users.bulkCreate(users),
    await Uploads.bulkCreate(uploads),
  ]);
  await Promise.all([
    await UploadsTags.bulkCreate(uploadsTags),
    await UploadsCategories.bulkCreate(uploadsCategories),
  ]);
};

if (NODE_ENV === 'development') {
  try {
    buildFakeData();
    console.log('Fake data has been built');
  } catch (err) {
    console.log(err);
  }
}

export default buildFakeData;
