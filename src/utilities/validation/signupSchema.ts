import Joi from 'joi';

export default Joi.object({
  username: Joi.string().required().messages({ 'string.empty': 'Username can\'t be empty', 'any.required': 'Username is required' }),
  email: Joi.string().email().rule({ message: 'Email is required' }).required(),
  password: Joi.string().$.min(6).max(33).rule({ message: 'Password length must be between 6 and 33 characters' })
    .required(),
});
