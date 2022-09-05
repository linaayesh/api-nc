import { IUser } from 'db-models-nc';
import CustomError from './CustomError';
import { messages, httpStatus, userStatus } from './constants';
import { getUserByEmail } from '../services';

const check = (statusOfTheUser: number): void => {
  switch (statusOfTheUser) {
    case (userStatus.REJECTED):
      throw new CustomError(messages.authResponse.ALREADY_REJECTED, httpStatus.UNAUTHORIZED);
      break;
    case (userStatus.PENDING):
      throw new CustomError(messages.authResponse.PENDING, httpStatus.UNAUTHORIZED);
      break;
    case (userStatus.BANNED):
      throw new CustomError(messages.authResponse.BANNED, httpStatus.UNAUTHORIZED);
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
    if (userExists) {
      throw new CustomError(messages.authResponse.ALREADY_EXIST, httpStatus.UNAUTHORIZED);
    }

    return messages.authResponse.NOT_EXIST;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(String(error), httpStatus.INTERNAL_SERVER_ERROR);
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
    if (!userExists || !userExists.userStatusId) {
      throw new CustomError(messages.authResponse.NOT_EXIST, httpStatus.UNAUTHORIZED);
    }
    check(userExists.userStatusId);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(String(error), httpStatus.INTERNAL_SERVER_ERROR);
  }
};
