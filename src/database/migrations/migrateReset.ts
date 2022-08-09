import { sequelize } from 'db-models-nc';
import umzug from '../../../migration';

(async (): Promise<void> => {
  await umzug.down({ to: 0 });
  sequelize.close();
})();
