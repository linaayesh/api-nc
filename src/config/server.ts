import Joi from 'joi';
import { IServer } from '../interfaces';
import { requiredString, ENV_NUMBER } from '../helpers/validationRules';

const envVarsSchema = Joi.object({
  JWT_SECRET: requiredString,
  APP_MAIL: requiredString,
  MAIL_PASSWORD: requiredString,
  PORT: ENV_NUMBER,
  CLIENT_BASE_URL: requiredString,
  SERVER_BASE_URL: requiredString,
  CLIENT_ID: requiredString,
  GOOGLE_API: requiredString,
  AWS_BUCKET_NAME: requiredString,
  AWS_BUCKET_REGION: requiredString,
  AWS_ACCESS_KEY_ID: requiredString,
  AWS_SECRET_ACCESS_KEY: requiredString,
  ENCRYPTION_SECRET_KEY: requiredString,
}).unknown().required();

const config = (): IServer => {
  const { error, value: envVars } = envVarsSchema.validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    SECRET_KEY: envVars.JWT_SECRET,
    APP_MAIL: envVars.APP_MAIL,
    MAIL_PASSWORD: envVars.MAIL_PASSWORD,
    PORT: envVars.PORT,
    CLIENT_URL: envVars.CLIENT_BASE_URL,
    SERVER_URL: envVars.SERVER_BASE_URL,
    CLIENT_ID: envVars.CLIENT_ID,
    GOOGLE_API: envVars.GOOGLE_API,
    AWS_BUCKET_NAME: envVars.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: envVars.AWS_BUCKET_REGION,
    AWS_ACCESS_KEY_ID: envVars.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: envVars.AWS_SECRET_ACCESS_KEY,
    ENCRYPTION_SECRET_KEY: envVars.ENCRYPTION_SECRET_KEY,
  };
};

export default config;
