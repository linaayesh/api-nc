import { Users } from '../database/models';
import { CustomError } from '../utilities';
import { messages } from './constants';
import { IUsers } from '../interfaces';

const {
  approve, reject, notExist, verify, waitApprove,
} = messages.authResponse;

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

    if (userExists.isApproved) throw new CustomError(approve, 401);

    if (userExists.isRejected) throw new CustomError(reject, 401);

    if (userExists.isVerified) throw new CustomError(verify, 401);

    if (userExists) throw new CustomError(waitApprove, 401);

    return '';
  } catch (error) {
    const msg = (error as CustomError).message;
    const stat = (error as CustomError).status;
    throw new CustomError(msg, stat);
  }
};

/**
 * @description ApprovalChecks is a function  used to check user approve => true
 * @param {string} email user email
 * @returns {Promise<IUsers>}
 * if the user dose not exist return error, then check his status => if approved return User Object
 */

export const ApprovalChecks = async (email: string):Promise<IUsers> => {
  try {
    const userExists = await Users.findOne({ where: { email } });

    if (!userExists) throw new CustomError(notExist, 404);

    if (!userExists?.isVerified) throw new CustomError(verify, 401);

    if (userExists?.isRejected) throw new CustomError(reject, 401);

    if (!userExists?.isApproved) throw new CustomError(approve, 401);

    return userExists;
  } catch (error) {
    const msg = (error as CustomError).message;
    const stat = (error as CustomError).status;
    throw new CustomError(msg, stat);
  }
};

/**
 * @description VerificationChecks is a function  used to check user verify => true
 * @param {number} id user id
 * @returns {Promise<IUsers>}
 * if the user dose not exist return error, then if [not verify, approve, reject ] => error
 * if verify return User Object
 */

export const VerificationChecks = async (id: number):Promise<IUsers> => {
  try {
    const userExists = await Users.findOne({ where: { id } });

    if (!userExists) throw new CustomError(notExist, 404);

    if (!userExists.isVerified) throw new CustomError(verify, 401);

    if (userExists.isApproved) throw new CustomError(approve, 401);

    if (userExists.isRejected) throw new CustomError(reject, 401);

    return userExists;
  } catch (error) {
    const msg = (error as CustomError).message;
    const stat = (error as CustomError).status;
    throw new CustomError(msg, stat);
  }
};

export const VerificationEmailCheck = async (email: string):Promise<IUsers> => {
  try {
    const userExists = await Users.findOne({ where: { email } });

    if (!userExists) throw new CustomError(notExist, 404);

    if (userExists.isVerified) throw new CustomError(verify, 401);

    if (userExists.isApproved) throw new CustomError(approve, 401);

    if (userExists.isRejected) throw new CustomError(reject, 401);

    return userExists;
  } catch (error) {
    const msg = (error as CustomError).message;
    const stat = (error as CustomError).status;
    throw new CustomError(msg, stat);
  }
};
// export { RegistrationCheck, ApprovalChecks, VerificationChecks };
