import { settings } from 'db-models-nc';
import { Migration } from '../migration';

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('settings', settings);
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('settings', { name: settings.map((setting) => setting.name) });
};

export { up, down };
