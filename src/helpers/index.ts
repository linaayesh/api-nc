import * as Constants from './constants';
import * as Checkers from './checkUserExistence';
import { validator } from './validate';
import * as VALIDATION_RULES from './validationRules';
import * as DTO from './dto';
import * as ERROR_MESSAGES from './errorMessages';

const checkExistence = Checkers;
const constants = Constants;
const dto = DTO;
const errorMessages = ERROR_MESSAGES;

export {
  signupSchema,
  loginSchema,
  idSchema,
  createUserSchema,
  emailSchema,
  editProfileSchema,
  financialInformationSchema,
  passwordSchema,
  getPaginatedDataSchema,
  matchUserContentSchema,
  changePasswordSchema,
  editSystemSettingsSchema,
  getAdminStatisticsSchema,
} from './validation';

export { forgetPasswordDTO } from './dto/auth';

export {
  validator, checkExistence, constants, VALIDATION_RULES, dto, errorMessages,
};

export { default as Logger } from './logger';
export { default as CustomError } from './CustomError';
export { default as validateError } from './validationError';
export { default as sendEmail } from './emailService';
export { default as tokenError } from './tokenError';
export { signToken, verifyToken } from './jwt';
export { default as upload } from './uploadImage';
export { default as googleAuthentication } from './googleAuthentication';
