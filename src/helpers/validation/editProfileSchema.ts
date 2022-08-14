import Joi from 'joi';

export default Joi.object({
  id: Joi.number().required(),
  name: Joi.string(),
  image: Joi.string(),
  videoNotification: Joi.boolean(),
  paymentNotification: Joi.boolean(),
});
