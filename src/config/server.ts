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
}).unknown().required();

const config = (): IServer => {
  const { error, value: envVars } = envVarsSchema.validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    secretKey: envVars.JWT_SECRET,
    appMail: envVars.APP_MAIL,
    mailPassword: envVars.MAIL_PASSWORD,
    port: envVars.PORT,
    clientURL: envVars.CLIENT_BASE_URL,
    serverURL: envVars.SERVER_BASE_URL,
    clientId: envVars.CLIENT_ID,
    googleAPI: envVars.GOOGLE_API,
  };
};

export default config;
