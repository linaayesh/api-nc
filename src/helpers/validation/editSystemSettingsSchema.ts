import Joi from 'joi';

export default Joi.object({
  nextupToOwedSplitPercentage: Joi.number().min(0).max(1).required(),
  systemActivationDate: Joi.date().required(),
  fetchMaxCount: Joi.number().min(0).required(),
  expiredAfterInYears: Joi.number().min(0).required(),
  viewliftEmail: Joi.string().email().required(),
  viewliftEndpoint: Joi.string().uri().required(),
  viewliftWatchesFetchLimit: Joi.number().min(0).max(1000).required(),
  viewliftPassword: Joi.string().required(),
});
