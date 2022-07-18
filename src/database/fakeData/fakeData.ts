const users = [
  {
    username: 'system',
    email: 'system@nextupcomidey.com',
    password: '$2b$10$O2cKyz8IAgx0jI2OO89j0uZWX9avosPQQ3xWZzcQn7fP/Y3OeFfXG',
    isApproved: true,
  },
  {
    username: 'admin',
    email: 'admin@gmail.com',
    password: '$2b$10$O2cKyz8IAgx0jI2OO89j0uZWX9avosPQQ3xWZzcQn7fP/Y3OeFfXG',
    roleId: 1,
    isApproved: true,
  },
  {
    username: 'zaher',
    email: 'zaherabuamro@gmail.com',
    password: '$2b$10$O2cKyz8IAgx0jI2OO89j0uZWX9avosPQQ3xWZzcQn7fP/Y3OeFfXG',
    roleId: 2,
    isApproved: true,
    isRejected: true,
  },
  {
    username: 'ibrahim',
    email: 'ibrahim.jarada@gmail.com',
    password: '$2b$10$O2cKyz8IAgx0jI2OO89j0uZWX9avosPQQ3xWZzcQn7fP/Y3OeFfXG',
    roleId: 2,
    isApproved: true,
  },
  // {
  //   username: 'rand',
  //   email: 'randsohail98@gmail.com',
  //   password: '$2b$10$O2cKyz8IAgx0jI2OO89j0uZWX9avosPQQ3xWZzcQn7fP/Y3OeFfXG',
  //   roleId: 2,
  //   isApproved: false,
  // },
  {
    username: 'ayman',
    email: 'ayman@gmail.com',
    password: '$2b$10$O2cKyz8IAgx0jI2OO89j0uZWX9avosPQQ3xWZzcQn7fP/Y3OeFfXG',
    roleId: 2,
    isApproved: false,
  },
];

const roles = [
  {
    name: 'system-admin',
  },
  {
    name: 'comedian',
  },
];

const uploads = [
  {
    userId: 1,
    title: 'upload 1',
    status: 'pending',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-zaher/1.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-zaher/1.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-zaher/1.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-zaher/1.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-zaher/1.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-zaher/1.jpg',
  },
  {
    userId: 1,
    title: 'upload 2',
    status: 'approved',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-zaher/2.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-zaher/2.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-zaher/2.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-zaher/2.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-zaher/2.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-zaher/2.jpg',
  },
  {
    userId: 1,
    title: 'upload 3',
    status: 'rejected',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-zaher/3.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-zaher/3.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-zaher/3.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-zaher/3.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-zaher/3.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-zaher/3.jpg',

  },
  {
    userId: 2,
    title: 'upload 4',
    status: 'pending',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-ibrahim/4.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-ibrahim/4.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-ibrahim/4.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-ibrahim/4.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-ibrahim/4.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-ibrahim/4.jpg',
  },
  {
    userId: 2,
    title: 'upload 5',
    status: 'approved',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-ibrahim/5.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-ibrahim/5.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-ibrahim/5.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-ibrahim/5.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-ibrahim/5.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-ibrahim/5.jpg',

  },
  {
    userId: 2,
    title: 'upload 6',
    status: 'rejected',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-ibrahim/6.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-ibrahim/6.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-ibrahim/6.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-ibrahim/6.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-ibrahim/6.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-ibrahim/6.jpg',
  },
  {
    userId: 3,
    title: 'upload 7',
    status: 'pending',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-rand/7.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-rand/7.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-rand/7.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-rand/7.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-rand/7.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-rand/7.jpg',

  },
  {
    userId: 3,
    title: 'upload 8',
    status: 'approved',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-rand/8.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-rand/8.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-rand/8.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-rand/8.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-rand/8.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-rand/8.jpg',

  },
  {
    userId: 3,
    title: 'upload 9',
    status: 'rejected',
    s3VideoLink: 'https://s3.amazonaws.com/uploads-rand/9.mp4',
    image1920x1080: 'https://s3.amazonaws.com/uploads-rand/9.jpg',
    image1070x1585: 'https://s3.amazonaws.com/uploads-rand/9.jpg',
    image1080x1920: 'https://s3.amazonaws.com/uploads-rand/9.jpg',
    image1080x1080: 'https://s3.amazonaws.com/uploads-rand/9.jpg',
    image3840x1080: 'https://s3.amazonaws.com/uploads-rand/9.jpg',
  },
];

const tags = [
  {
    name: 'tag 1',
  },
  {
    name: 'tag 2',
  },
  {
    name: 'tag 3',
  },
  {
    name: 'tag 4',
  },
  {
    name: 'tag 5',
  },
  {
    name: 'tag 6',
  },
  {
    name: 'tag 7',
  },
  {
    name: 'tag 8',
  },
  {
    name: 'tag 9',
  },
  {
    name: 'tag 10',
  },
];

const categories = [
  {
    name: 'category 1',
  },
  {
    name: 'category 2',
  },
  {
    name: 'category 3',
  },
  {
    name: 'category 4',
  },
  {
    name: 'category 5',
  },
  {
    name: 'category 6',
  },
  {
    name: 'category 7',
  },
  {
    name: 'category 8',
  },
  {
    name: 'category 9',
  },
  {
    name: 'category 10',
  },
];

const uploadsTags = [
  {
    uploadId: 1,
    tagId: 1,
  },
  {
    uploadId: 1,
    tagId: 2,
  },
  {
    uploadId: 2,
    tagId: 2,
  },
  {
    uploadId: 3,
    tagId: 3,
  },
  {
    uploadId: 3,
    tagId: 4,
  },
  {
    uploadId: 3,
    tagId: 5,
  },
  {
    uploadId: 4,
    tagId: 4,
  },
  {
    uploadId: 5,
    tagId: 5,
  },
  {
    uploadId: 6,
    tagId: 6,
  },
  {
    uploadId: 7,
    tagId: 7,
  },
  {
    uploadId: 8,
    tagId: 8,
  },
  {
    uploadId: 9,
    tagId: 9,
  },
];

const uploadsCategories = [
  {
    uploadId: 1,
    categoryId: 1,
  },
  {
    uploadId: 1,
    categoryId: 2,
  },
  {
    uploadId: 2,
    categoryId: 2,
  },
  {
    uploadId: 3,
    categoryId: 3,
  },
  {
    uploadId: 3,
    categoryId: 4,
  },
  {
    uploadId: 3,
    categoryId: 5,
  },
  {
    uploadId: 4,
    categoryId: 4,
  },
  {
    uploadId: 5,
    categoryId: 5,
  },
  {
    uploadId: 6,
    categoryId: 6,
  },
  {
    uploadId: 7,
    categoryId: 7,
  },
  {
    uploadId: 8,
    categoryId: 8,
  },
  {
    uploadId: 9,
    categoryId: 9,
  },
];

export {
  users,
  roles,
  uploads,
  tags,
  categories,
  uploadsTags,
  uploadsCategories,
};
