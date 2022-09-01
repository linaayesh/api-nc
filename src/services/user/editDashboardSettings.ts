import { AES, enc } from 'crypto-js';
import { Settings, ISettings, IVariables } from 'db-models-nc';
import { CustomError, constants } from '../../helpers';
import config from '../../config';

const { ENCRYPTION_SECRET_KEY } = config.server;

type IEditDashboardSettings = (_: IVariables) => Promise<IVariables>

const editDashboardSettings: IEditDashboardSettings = async ({
  encryptedVariables,
  regularVariables,
}) => {
  const oldVars = (await Settings.findOne({ where: { name: 'variables' } })) as ISettings;
  const oldVarsValue = oldVars.value as IVariables;

  const originalPassword = AES
    .decrypt(oldVarsValue.encryptedVariables.viewliftPassword, ENCRYPTION_SECRET_KEY)
    .toString(enc.Utf8);

  if (originalPassword === encryptedVariables.viewliftPassword) {
    throw new CustomError(
      constants.messages.authResponse.SAME_PASSWORD,
      constants.HttpStatus.BAD_REQUEST,
    );
  }

  const hashedPassword = AES.encrypt(encryptedVariables.viewliftPassword, ENCRYPTION_SECRET_KEY)
    .toString();

  oldVars.value = {
    regularVariables,
    encryptedVariables: { viewliftPassword: hashedPassword },
  };

  await oldVars.save();

  const newDashboardVars = {
    encryptedVariables,
    regularVariables,
  };

  return newDashboardVars;
};

export default editDashboardSettings;
