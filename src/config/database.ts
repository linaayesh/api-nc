import Joi from 'joi';
import { IDatabase } from '../interfaces';
import { requiredString } from '../helpers/validationRules';

const envVarsSchema = Joi.object({
  DATABASE_URL: requiredString,
}).unknown().required();

const config = (): IDatabase => {
  const { error, value: envVars } = envVarsSchema.validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    url: envVars.DATABASE_URL,
  };
};

export default config;
