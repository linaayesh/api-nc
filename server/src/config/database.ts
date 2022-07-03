import Joi from 'joi';
import { IDatabase } from '../interfaces';

const envVarsSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
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
