import Joi from 'joi';
import { IDatabase } from '../interfaces';
import { ENV_STRING } from '../helpers/validationRules';

const envVarsSchema = Joi.object({
  DATABASE_URL: ENV_STRING,
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
