import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  method: Joi.string(),
});
