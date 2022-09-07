import { payoutStatuses } from 'db-models-nc';
import { Migration } from '../migration';

const up:Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('payout_statuses', payoutStatuses);
};

const down:Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('payout_statuses', { name: payoutStatuses.map((status) => status.name) });
};

export { up, down };
