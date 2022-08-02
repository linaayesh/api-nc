import Joi from 'joi';

export default Joi.object({
  id: Joi.number().required(),
  username: Joi.string(),
  image: Joi.string(),
  updatedBy: Joi.number().required(),
  videoNotification: Joi.boolean(),
  paymentNotification: Joi.boolean(),
});
