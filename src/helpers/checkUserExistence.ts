import { Users } from '../database/models';
import { CustomError, validateError } from '../utilities';
import { messages, HttpStatus } from './constants';
import { IUsers } from '../interfaces';

const {
  notExist, UNVERIFIED, ALREADY_APPROVED, ALREADY_REJECTED, PENDING,
} = messages.authResponse;
const { CONFLICT, UNAUTHORIZED } = HttpStatus;

/**
 * @description RegistrationCheck is a function  used to check user existence sign up
 * @param {string} email user email
 * @returns {Promise<string | void>}
 * if the user exist return his status, if not exist continue registration
 */

export const RegistrationCheck = async (email: string):Promise<string | void> => {
  try {
    const userExists = await Users.findOne({ where: { email } });

    if (!userExists) return notExist;

    if (userExists.userStatusId === 2) throw new CustomError(ALREADY_APPROVED, CONFLICT);

    if (userExists.userStatusId === 3) throw new CustomError(ALREADY_REJECTED, UNAUTHORIZED);

    // TODO: isVerified => isPending
    if (userExists.isVerified) throw new CustomError(PENDING, UNAUTHORIZED);

    return '';
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw validateError(error as Error);
  }
};

/**
 * @description ApprovalChecks is a function used to check user approve => true LogIn, ResetPassword
 * @param {string} email user email
 * @returns {Promise<IUsers>}
 * if the user dose not exist return error, then check his status => if approved return User Object
 */

export const ApprovalChecks = async (email: string):Promise<IUsers> => {
  try {
    const userExists = await Users.findOne({ where: { email } });

    if (!userExists) throw new CustomError(notExist, UNAUTHORIZED);

    if (!userExists.isVerified) throw new CustomError(UNVERIFIED, UNAUTHORIZED);

    if (userExists.userStatusId === 3) throw new CustomError(ALREADY_REJECTED, UNAUTHORIZED);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw validateError(error as Error);
  }
};

/**
 * @description VerificationChecks is a function  used to check user verify=> true|change his status
 * @param {number} id user id
 * @returns {Promise<IUsers>}
 * if the user dose not exist return error, then if [not verified, approved, rejected ] => error
 * if verify return User Object
 */

export const VerificationChecks = async (id: number):Promise<IUsers> => {
  try {
    const userExists = await Users.findOne({ where: { id } });

    if (!userExists) throw new CustomError(notExist, UNAUTHORIZED);

    if (!userExists.isVerified) throw new CustomError(UNVERIFIED, UNAUTHORIZED);

    if (userExists.userStatusId === 2) throw new CustomError(ALREADY_APPROVED, CONFLICT);

    if (userExists.userStatusId === 3) throw new CustomError(ALREADY_REJECTED, UNAUTHORIZED);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw validateError(error as Error);
  }
};

/**
 * @description VerificationEmailCheck is a function  used to check user verified email => false
 * @param {string} email user email
 * @returns {Promise<IUsers>}
 * if the user not exist return error, if verified | approved | rejected => error
 */

export const VerificationEmailCheck = async (email: string):Promise<IUsers> => {
  try {
    const userExists = await Users.findOne({ where: { email } });

    if (!userExists) throw new CustomError(notExist, UNAUTHORIZED);

    if (userExists.isVerified) throw new CustomError(UNVERIFIED, UNAUTHORIZED);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw validateError(error as Error);
  }
};
