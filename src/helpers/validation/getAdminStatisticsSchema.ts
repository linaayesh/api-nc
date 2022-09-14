import Joi from 'joi';

export default Joi.object().keys({
  fromDate: Joi.string().isoDate(),
  toDate: Joi.string().isoDate(),
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
}).and('toDate', 'fromDate');
