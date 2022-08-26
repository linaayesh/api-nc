import Joi from 'joi';

export default Joi.object({
  limit: Joi.number().min(1).max(1000),
  page: Joi.number().min(1),
  title: Joi.string(),
  id: Joi.string(),
});
