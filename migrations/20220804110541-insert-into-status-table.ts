import { userStatus } from 'db-models-nc';
import { Migration } from '../migration';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('user_statuses', userStatus);
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('user_statuses', { name: userStatus.map((user) => user.name) });
};

export { up, down };
