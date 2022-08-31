import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import generatePassword from 'generate-password';
import {
  checkExistence,
  constants,
  sendEmail,
  googleAuthentication,
} from '../../helpers';
import { addUser } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const {
    HttpStatus,
    USER_ROLES,
    REVENUE_DEFAULT_VALUE,
    PASSWORD_LENGTH,
    EMAIL_TYPE,
  } = constants;

  try {
    const {
      email, name, image, googleId,
    } = await googleAuthentication(body.tokenId);

    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: PASSWORD_LENGTH,
      numbers: true,
      strict: true,
      lowercase: true,
      uppercase: true,
    });

    const hashedPassword = await hash(password, 10);

    const user = await addUser({
      name,
      email,
      userRoleId: USER_ROLES.COMEDIAN,
      password: hashedPassword,
      createdBy: USER_ROLES.SYSTEM,
      updatedBy: USER_ROLES.SYSTEM,
      image,
      googleId,
      userStatusId: constants.USER_STATUS.PENDING,
      freeToBePaidRevenue: REVENUE_DEFAULT_VALUE,
      accPaidRevenue: REVENUE_DEFAULT_VALUE,
    });

    await sendEmail({
      email: user.email,
      type: EMAIL_TYPE.VERIFY,
      name: user.name,
    });

    res
      .status(HttpStatus.CREATED)
      .json({ message: constants.MESSAGES.authResponse.SUCCESS });
  } catch (error) {
    next(error);
  }
};
