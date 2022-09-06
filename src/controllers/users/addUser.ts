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
  const { CREATED, UNAUTHORIZED } = constants.HttpStatus;
  const { APPROVED } = constants.USER_STATUS;

  try {
    const lowercaseEmail = email.toLowerCase();
    await checkExistence.RegistrationCheck(lowercaseEmail);

    const password = generatePassword.generate({
      length: 15, numbers: true, strict: true, lowercase: true, uppercase: true,
    });
    const hashedPassword = await hash(password, 10);

    if (!req.user || !req.user.id) {
      throw new CustomError(constants.messages.authResponse.UNAUTHORIZED, UNAUTHORIZED);
    }
    const user = await addUser({
      name,
      email: email.toLowerCase(),
      userRoleId: roleId,
      password: hashedPassword,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      userStatusId: APPROVED,
      totalRevenue: constants.REVENUE_DEFAULT_VALUE,
      paidRevenue: constants.REVENUE_DEFAULT_VALUE,
    });

    await sendEmail({
      email: user.email,
      type: 'create',
      name: user.name,
      password,
    });
    res
      .status(CREATED)
      .json({ message: constants.messages.authResponse.SUCCESS, data: user });
  } catch (err) {
    next(err);
  }
};
