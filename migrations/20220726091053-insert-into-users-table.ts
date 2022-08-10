import { users } from 'db-models-nc';
import { Migration } from '../migration';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query('ALTER TABLE users DISABLE TRIGGER ALL');
  await queryInterface.bulkInsert('users', users);
  await queryInterface.sequelize.query('ALTER TABLE users ENABLE TRIGGER ALL');
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('users', { name: users.map((user) => user.name) });
};

export { up, down };
