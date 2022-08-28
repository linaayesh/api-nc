import { IUser } from 'db-models-nc';
import CustomError from './CustomError';
import { messages, HttpStatus, USER_STATUS } from './constants';
import { getUserByEmail, getUserById } from '../services';

const {
  notExist, ALREADY_APPROVED, ALREADY_REJECTED, ALREADY_EXIST,
} = messages.authResponse;
const { CONFLICT, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HttpStatus;
const {
  APPROVED, REJECTED, PENDING, BANNED,
} = USER_STATUS;

const check = (checkType: string, statusOfTheUser: number): void => {
  if (statusOfTheUser === REJECTED) throw new CustomError(ALREADY_REJECTED, UNAUTHORIZED);

  if (checkType === messages.check.VERIFY_CHECK) {
    if (statusOfTheUser === APPROVED) throw new CustomError(ALREADY_APPROVED, CONFLICT);
  }

  if (checkType === messages.check.APPROVE_CHECK) {
    if (statusOfTheUser === PENDING) {
      throw new CustomError(messages.authResponse.PENDING, UNAUTHORIZED);
    }

    if (statusOfTheUser === BANNED) {
      throw new CustomError(messages.authResponse.BANNED, UNAUTHORIZED);
    }
  }
};

/**
 * @description RegistrationCheck is a function  used to check user existence sign up
 * @param {string} email user email
 * @returns {Promise<string | void>}
 * if the user exist return error existence, if not exist continue registration
 */
export const RegistrationCheck = async (email: string): Promise<string> => {
  try {
    const userExists = await getUserByEmail(email);
    if (userExists) throw new CustomError(ALREADY_EXIST, UNAUTHORIZED);

    return notExist;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(String(error), INTERNAL_SERVER_ERROR);
  }
};

/**
 * @description ApprovalChecks is a function used to check user approve => true LogIn, ResetPassword
 * @param {IUser | null}  userExists user object
 * @returns {Promise<IUser>}
 * if the user dose not exist return error, then check his status => if approved return User Object
 */
export const ApprovalChecks = async (userExists: IUser | null): Promise<IUser> => {
  try {
    if (!userExists || !userExists.userStatusId) throw new CustomError(notExist, UNAUTHORIZED);

    check(messages.check.APPROVE_CHECK, userExists.userStatusId);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(String(error), INTERNAL_SERVER_ERROR);
  }
};

/**
 * @description VerificationChecks is a function  used to check user verify=> true|change his status
 * @param {number} id user id
 * @returns {Promise<IUser>}
 * if the user dose not exist return error, then if [not verified, approved, rejected ] => error
 * if verify return User Object
 */
export const VerificationChecks = async (id: number):Promise<IUser> => {
  try {
    const userExists = await getUserById(id);

    if (!userExists || !userExists.userStatusId) throw new CustomError(notExist, UNAUTHORIZED);

    check(messages.check.VERIFY_CHECK, userExists.userStatusId);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(String(error), INTERNAL_SERVER_ERROR);
  }
};
