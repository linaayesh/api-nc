import Joi from 'joi';

export default Joi.object({
  targetContent: Joi.string().valid('all', 'matched', 'unmatched').required(),
});
