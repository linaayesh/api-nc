import Joi from 'joi';

export default Joi.object({
  limit: Joi.number().required(),
  page: Joi.number().required(),
});
