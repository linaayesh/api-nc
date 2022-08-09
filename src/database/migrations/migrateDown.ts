import { sequelize } from 'db-models-nc';
import umzug from '../../../migration';

(async (): Promise<void> => {
  await umzug.down();
  sequelize.close();
})();
