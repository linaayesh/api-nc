import { Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import generatePassword from 'generate-password';
import {
  checkExistence, constants, CustomError, sendEmail,
} from '../../helpers';
import { UserAuth } from '../../interfaces';
import { addUser } from '../../services';

export default async (req: UserAuth, res: Response, next: NextFunction):Promise<void> => {
  const {
    name, email, roleId,
  } = req.body;
  const {
    HttpStatus, USER_STATUS, PASSWORD_LENGTH, EMAIL_TYPE,
  } = constants;

  try {
    const lowercaseEmail = email.toLowerCase();
    await checkExistence.RegistrationCheck(lowercaseEmail);

    const password = generatePassword.generate({
      length: PASSWORD_LENGTH, numbers: true, strict: true, lowercase: true, uppercase: true,
    });
    const hashedPassword = await hash(password, 10);

    if (!req.user || !req.user.id) {
      throw new CustomError(constants.MESSAGES.authResponse.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const user = await addUser({
      name,
      email: email.toLowerCase(),
      userRoleId: roleId,
      password: hashedPassword,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      userStatusId: USER_STATUS.APPROVED,
      accPaidRevenue: constants.REVENUE_DEFAULT_VALUE,
      freeToBePaidRevenue: constants.REVENUE_DEFAULT_VALUE,
    });

    await sendEmail({
      email: user.email,
      type: EMAIL_TYPE.CREATE,
      name: user.name,
      password,
    });
    res
      .status(HttpStatus.CREATED)
      .json({ message: constants.MESSAGES.authResponse.SUCCESS, data: user });
  } catch (err) {
    next(err);
  }
};
