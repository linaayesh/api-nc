/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users } from '../database/models';
import { CustomError } from '../utilities';
import { constants } from '.';

export default async (email: string, method: string):Promise<string | any> => {
  const {
    approve, reject, waitApprove, notExist, verify,
  } = constants.messages.authResponse;
  const { logInCheck, verifyCheck } = constants.messages.check;
  try {
    const userExists = await Users.findOne({ where: { email } });
    if (method === verifyCheck) {
      if (!userExists) throw new CustomError(notExist, 404);
      if (userExists.isVerified) throw new CustomError(verify, 401);
      return userExists;
    }
    // *log in
    if (method === logInCheck) {
      if (!userExists) throw new CustomError(notExist, 404);
      if (userExists.isRejected) throw new CustomError(reject, 401);
      if (userExists.isApproved) return userExists;
    }
    //* for sign up
    if (!userExists) return notExist; // return any text to complete sign up
    if (userExists.isRejected) throw new CustomError(reject, 401);
    if (userExists.isApproved) throw new CustomError(approve, 401);
    if (userExists) throw new CustomError(waitApprove, 400);
    return '';
  } catch (error: Error | any) {
    throw new CustomError(error.message, error.status);
  }
};
