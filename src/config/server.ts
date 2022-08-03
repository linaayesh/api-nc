import Joi from 'joi';
import { IServer } from '../interfaces';

const envVarsSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  APP_MAIL: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  PORT: Joi.number().required(),
  CLIENT_BASE_URL: Joi.string().required(),
  SERVER_BASE_URL: Joi.string().required(),
  CLIENT_ID: Joi.string().required(),
  GOOGLE_API: Joi.string().required(),
  AWS_BUCKET_NAME: Joi.string().required(),
  AWS_BUCKET_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
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
