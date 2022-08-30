import { IUser } from 'db-models-nc';
import CustomError from './CustomError';
import { MESSAGES, HttpStatus, USER_STATUS } from './constants';
import { getUserByEmail } from '../services';

const {
  notExist, ALREADY_EXIST,
} = MESSAGES.authResponse;
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HttpStatus;
const {
  REJECTED, PENDING, BANNED,
} = USER_STATUS;

const check = (statusOfTheUser: number): void => {
  switch (statusOfTheUser) {
    case (REJECTED):
      throw new CustomError(MESSAGES.authResponse.ALREADY_REJECTED, UNAUTHORIZED);
      break;
    case (PENDING):
      throw new CustomError(MESSAGES.authResponse.PENDING, UNAUTHORIZED);
      break;
    case (BANNED):
      throw new CustomError(MESSAGES.authResponse.BANNED, UNAUTHORIZED);
      break;
    default: break;
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
    if (!userExists) throw new CustomError(notExist, UNAUTHORIZED);

    check(userExists.userStatusId);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(String(error), INTERNAL_SERVER_ERROR);
  }
};
