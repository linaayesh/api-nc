import Joi from 'joi';
import { IServer } from '../interfaces';
import { ENV_STRING, ENV_NUMBER } from '../helpers/validationRules';

const envVarsSchema = Joi.object({
  JWT_SECRET: ENV_STRING,
  APP_MAIL: ENV_STRING,
  MAIL_PASSWORD: ENV_STRING,
  PORT: ENV_NUMBER,
  CLIENT_BASE_URL: ENV_STRING,
  SERVER_BASE_URL: ENV_STRING,
  CLIENT_ID: ENV_STRING,
  GOOGLE_API: ENV_STRING,
  AWS_BUCKET_NAME: ENV_STRING,
  AWS_BUCKET_REGION: ENV_STRING,
  AWS_ACCESS_KEY_ID: ENV_STRING,
  AWS_SECRET_ACCESS_KEY: ENV_STRING,
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
  };
};

export default config;
