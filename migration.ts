import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from 'db-models-nc';

const umzug = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: process.cwd() }],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migration_meta',
  }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;
export default umzug;
