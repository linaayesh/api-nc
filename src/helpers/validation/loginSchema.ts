import Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().rule({ message: 'Email is required' }).required(),
  password: Joi.string().$.min(6).max(33).rule({ message: 'Password length must be between 6 and 33 characters' })
    .required(),
});
