import Joi from 'joi';

export default Joi.object({
  oldPassword: Joi.string().required(),
  password: Joi.string().invalid(Joi.ref('oldPassword')).messages({ 'any.invalid': "New password shouldn't be the same as the old one" }).required(),
  confirm: Joi.ref('password'),
});
