import Joi from 'joi';
import { IEmailConfigs } from '../interfaces/email';
import { requiredString, email } from '../helpers/validationRules';

const envVarsSchema = Joi.object({
  SENDGRID_ADMIN_EMAIL: email,
  SENDGRID_API_KEY: requiredString,
  SENDGRID_VERIFICATION_TEMPLATE_ID: requiredString,
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID: requiredString,
  SENDGRID_APPROVAL_TEMPLATE_ID: requiredString,
  SENDGRID_REJECTION_TEMPLATE_ID: requiredString,
  SENDGRID_CREATE_USER_TEMPLATE_ID: requiredString,
  NEXTUP_COMEDY_SUPPORT_EMAIL: email,
}).unknown().required();

const config = (): IEmailConfigs => {
  const { error, value: envVars } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    SENDGRID_ADMIN_EMAIL: envVars.SENDGRID_ADMIN_EMAIL,
    SENDGRID_API_KEY: envVars.SENDGRID_API_KEY,
    SENDGRID_VERIFICATION_TEMPLATE_ID: envVars.SENDGRID_VERIFICATION_TEMPLATE_ID,
    SENDGRID_RESET_PASSWORD_TEMPLATE_ID: envVars.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
    SENDGRID_APPROVAL_TEMPLATE_ID: envVars.SENDGRID_APPROVAL_TEMPLATE_ID,
    SENDGRID_REJECTION_TEMPLATE_ID: envVars.SENDGRID_REJECTION_TEMPLATE_ID,
    SENDGRID_CREATE_USER_TEMPLATE_ID: envVars.SENDGRID_CREATE_USER_TEMPLATE_ID,
    NEXTUP_COMEDY_SUPPORT_EMAIL: envVars.NEXTUP_COMEDY_SUPPORT_EMAIL,
  };
};

export default config;
