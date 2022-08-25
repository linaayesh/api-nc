import { IUser } from 'db-models-nc';
import CustomError from './CustomError';
import { messages, HttpStatus, USER_STATUS } from './constants';
import { getUserByEmail, getUserById } from '../services';

const {
  notExist, ALREADY_APPROVED, ALREADY_REJECTED,
} = messages.authResponse;
const { CONFLICT, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HttpStatus;
const {
  APPROVED, REJECTED, PENDING, BANNED,
} = USER_STATUS;

/**
 * @description RegistrationCheck is a function  used to check user existence sign up
 * @param {string} email user email
 * @returns {Promise<string | void>}
 * if the user exist return his status, if not exist continue registration
 */

export const RegistrationCheck = async (email: string): Promise<string | void> => {
  try {
    const userExists = await getUserByEmail(email);
    if (!userExists) return notExist;

    const userStatus = userExists.userStatusId;

    if (userStatus === APPROVED) throw new CustomError(ALREADY_APPROVED, CONFLICT);

    if (userStatus === REJECTED) throw new CustomError(ALREADY_REJECTED, UNAUTHORIZED);

    if (userStatus === PENDING) throw new CustomError(messages.authResponse.PENDING, UNAUTHORIZED);

    if (userStatus === BANNED) throw new CustomError(messages.authResponse.BANNED, UNAUTHORIZED);

    return '';
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

    const userStatus = userExists.userStatusId;

    if (userStatus === REJECTED) throw new CustomError(ALREADY_REJECTED, UNAUTHORIZED);

    if (userStatus === PENDING) throw new CustomError(messages.authResponse.PENDING, UNAUTHORIZED);

    if (userStatus === BANNED) throw new CustomError(messages.authResponse.BANNED, UNAUTHORIZED);

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

    if (!userExists) throw new CustomError(notExist, UNAUTHORIZED);

    if (userExists.userStatusId === APPROVED) throw new CustomError(ALREADY_APPROVED, CONFLICT);

    if (userExists.userStatusId === REJECTED) throw new CustomError(ALREADY_REJECTED, UNAUTHORIZED);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(String(error), INTERNAL_SERVER_ERROR);
  }
};
