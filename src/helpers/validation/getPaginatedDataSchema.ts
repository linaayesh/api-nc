import Joi from 'joi';

export default Joi.object({
  limit: Joi.number().min(1).max(1000).required(),
  page: Joi.number().min(1).required(),
  title: Joi.string(),
  id: Joi.string(),
});
