import Joi from 'joi';

export default Joi.object({
  oldPassword: Joi.string().required(),
  password: Joi.string().required(),
  confirm: Joi.ref('password'),
});
