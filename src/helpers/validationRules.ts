import Joi from 'joi';

const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,10}$/;

export const email = Joi.string().min(5).max(255).email()
  .regex(RegExp(EMAIL_REGEX))
  .rule({ message: 'You must enter a valid Email' })
  .required();

export const name = Joi.string()
  .required().messages({ 'string.empty': 'name cannot be empty', 'any.required': 'name is required' });

export const password = Joi.string().$.min(6).max(33)
  .rule({ message: 'Password length must be between 6 and 33 characters' })
  .required();

export const idValidation = Joi.number().min(1).required();

export const stringValidation = Joi.string();

export const booleanValidation = Joi.boolean();

export const limit = Joi.number().min(1).max(1000);

export const page = Joi.number().min(1);

export const positiveNumber = Joi.number().min(0).required();

export const percentageNumber = Joi.number().min(0).max(1).required();

export const date = Joi.string().isoDate().required();

export const guid = Joi.string().guid();

export const passwordRef = Joi.string().invalid(Joi.ref('oldPassword')).messages({ 'any.invalid': "New password shouldn't be the same as the old one" }).required();

export const confirmPassword = Joi.ref('password');

export const uri = Joi.string().uri().required();

// import Joi from 'joi';
// import { EMAIL_REGEX, validationRulesMessages } from './constants';

// export const email = Joi.string().min(5).max(255).email()
//   .regex(RegExp(EMAIL_REGEX))
//   .rule({ message: validationRulesMessages.VALID_EMAIL })
//   .required();

// export const name = Joi.string()
//   .required().messages({ 'string.empty': validationRulesMessages.
// NAME_EMPTY, 'any.required': validationRulesMessages.NAME_REQUIRED });

// export const password = Joi.string().$.min(6).max(33)
//   .rule({ message: validationRulesMessages.PASSWORD_LENGTH })
//   .required();

// export const idValidation = Joi.number().min(1).required();

// export const stringValidation = Joi.string();

// export const booleanValidation = Joi.boolean();

// export const limit = Joi.number().min(1).max(1000);

// export const page = Joi.number().min(1);

// export const positiveNumber = Joi.number().min(0).required();

// export const percentageNumber = Joi.number().min(0).max(1).required();

// export const date = Joi.string().isoDate().required();

// export const guid = Joi.string().guid();

// export const passwordRef = Joi.string().invalid(Joi.ref('oldPassword'))
// .messages({ 'any.invalid': validationRulesMessages.PASSWORD_MATCH }).required();

// export const confirmPassword = Joi.ref('password');

// export const uri = Joi.string().uri().required();
