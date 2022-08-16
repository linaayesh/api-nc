import Joi from 'joi';

export default Joi.object({
  id: Joi.string().guid().required(),
  userId: Joi.number().min(1).required(),
  filmingCosts: Joi.number().min(0).required(),
  launchDate: Joi.string().isoDate().required(),
  advance: Joi.number().min(0).required(),
  feePaid: Joi.number().min(0).required(),
});
