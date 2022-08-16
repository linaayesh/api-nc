import Joi from 'joi';

export default Joi.object({
  id: Joi.string().required(),
  userId: Joi.number().min(1).required(),
  filmingCosts: Joi.number().min(0).required(),
  launchDate: Joi.string().isoDate().required(),
  advance: Joi.number().required(),
  feePaid: Joi.number().required(),
});
