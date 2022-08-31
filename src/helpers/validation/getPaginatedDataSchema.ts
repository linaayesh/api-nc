import Joi from 'joi';
import { limit, page } from '../validationRules';

export default Joi.object({
  limit,
  page,
  title: Joi.string(),
  id: Joi.string().guid(),
});
