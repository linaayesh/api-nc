import Joi from 'joi';

export default Joi.object({
  fromDate: Joi.string().isoDate(),
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
});
