import { userRoles } from 'db-models-nc';
import { Migration } from '../migration';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('user_roles', userRoles);
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('user_roles', { name: userRoles.map((role) => role.name) });
};

export { up, down };
