import { Users } from '../database/models';
import { CustomError, validateError } from '../utilities';
import { messages, userStatus } from './constants';
import { IUsers } from '../interfaces';

const {
  approvedUser, rejectedUser, notExist, verifiedUser, waitApprove,
} = messages.authResponse;

const { approved, rejected } = userStatus;

/**
 * @description RegistrationCheck is a function  used to check user existence
 * @param {string} email user email
 * @returns {Promise<string | void>}
 * if the user exist return his status, if not exist continue registration
 */

export const RegistrationCheck = async (email: string):Promise<string | void> => {
  try {
    const userExists = await Users.findOne({ where: { email } });

    if (!userExists) return notExist;

    if (userExists.status === approved) throw new CustomError(approvedUser, 401);

    if (userExists.status === rejected) throw new CustomError(rejectedUser, 401);

    if (userExists.isVerified) throw new CustomError(verifiedUser, 401);

    if (userExists) throw new CustomError(waitApprove, 401);

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
    console.log(1111);
    if (!userExists) throw new CustomError(notExist, 404);
    console.log(2222);
    if (!userExists?.isVerified) throw new CustomError(verifiedUser, 401);
    console.log(3333);
    if (userExists.status === rejected) throw new CustomError(rejectedUser, 401);
    console.log(44444);
    if (userExists.status !== approved) throw new CustomError(approvedUser, 401);
    console.log(5555);
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
 * if the user dose not exist return error, then if [not verify, approve, reject ] => error
 * if verify return User Object
 */

export const VerificationChecks = async (id: number):Promise<IUsers> => {
  try {
    const userExists = await Users.findOne({ where: { id } });

    if (!userExists) throw new CustomError(notExist, 404);

    if (!userExists.isVerified) throw new CustomError(verifiedUser, 401);

    if (userExists.status === approved) throw new CustomError(approvedUser, 401);

    if (userExists.status === rejected) throw new CustomError(rejectedUser, 401);

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

    if (!userExists) throw new CustomError(notExist, 404);

    if (userExists.isVerified) throw new CustomError(verifiedUser, 401);

    if (userExists.status === approved) throw new CustomError(approvedUser, 401);

    if (userExists.status === rejected) throw new CustomError(rejectedUser, 401);

    return userExists;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw validateError(error as Error);
  }
};
