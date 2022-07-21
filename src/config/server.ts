import Joi from 'joi';
import { IServer } from '../interfaces';

const envVarsSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  APP_MAIL: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  PORT: Joi.number().required(),
  CLIENT_BASE_URL: Joi.string().required(),
  SERVER_BASE_URL: Joi.string().required(),
  SENDGRID_ADMIN_EMAIL: Joi.string().required(),
  SENDGRID_API_KEY: Joi.string().required(),
  SENDGRID_VERIFICATION_TEMPLATE_ID: Joi.string().required(),
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID: Joi.string().required(),
  SENDGRID_APPROVAL_TEMPLATE_ID: Joi.string().required(),
  SENDGRID_REJECTION_TEMPLATE_ID: Joi.string().required(),
  NEXTUP_COMEDY_SUPPORT_EMAIL: Joi.string().required(),
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
    SENDGRID_ADMIN_EMAIL: envVars.SENDGRID_ADMIN_EMAIL,
    SENDGRID_API_KEY: envVars.SENDGRID_API_KEY,
    SENDGRID_VERIFICATION_TEMPLATE_ID: envVars.SENDGRID_VERIFICATION_TEMPLATE_ID,
    SENDGRID_RESET_PASSWORD_TEMPLATE_ID: envVars.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
    SENDGRID_APPROVAL_TEMPLATE_ID: envVars.SENDGRID_APPROVAL_TEMPLATE_ID,
    SENDGRID_REJECTION_TEMPLATE_ID: envVars.SENDGRID_REJECTION_TEMPLATE_ID,
    NEXTUP_COMEDY_SUPPORT_EMAIL: envVars.NEXTUP_COMEDY_SUPPORT_EMAIL,
  };
};

export default config;
