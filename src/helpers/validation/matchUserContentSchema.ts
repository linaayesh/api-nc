import Joi from 'joi';
import {
  idValidation, financialValidation, date, guid,
} from '../validationRules';

export default Joi.object({
  id: guid,
  userId: idValidation,
  filmingCosts: financialValidation,
  launchDate: date,
  advance: financialValidation,
  feePaid: financialValidation,
});
