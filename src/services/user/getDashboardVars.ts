import { AES, enc } from 'crypto-js';
import { Settings, ISettings, IVariables } from 'db-models-nc';
import config from '../../config';

const { ENCRYPTION_SECRET_KEY } = config.server;

type IGetDashboardVars = () => Promise<IVariables>

const getDashboardVars: IGetDashboardVars = async () => {
  const oldVars = (await Settings.findOne({ where: { name: 'variables' } })) as ISettings;
  const oldVarsValue = JSON.parse(oldVars.value as string) as IVariables;

  const originalPassword = AES
    .decrypt(oldVarsValue.encryptedVariables.viewliftPassword, ENCRYPTION_SECRET_KEY)
    .toString(enc.Utf8);

  return {
    regularVariables: oldVarsValue.regularVariables,
    encryptedVariables: { viewliftPassword: originalPassword },
  };
};

export default getDashboardVars;
