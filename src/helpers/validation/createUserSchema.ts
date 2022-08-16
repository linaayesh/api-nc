import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  roleId: Joi.number().required(),
});
