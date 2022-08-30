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

export default async ({ body: { tokenId } }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const {
    HttpStatus: { CREATED },
    USER_ROLES: { SYSTEM, COMEDIAN },
    REVENUE_DEFAULT_VALUE,
  } = constants;

  try {
    const {
      email, name, image, googleId,
    } = await googleAuthentication(tokenId);

    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: 20,
      numbers: true,
      strict: true,
      lowercase: true,
      uppercase: true,
    });

    const hashedPassword = await hash(password, 10);

    const user = await addUser({
      name,
      email,
      userRoleId: COMEDIAN,
      password: hashedPassword,
      createdBy: SYSTEM,
      updatedBy: SYSTEM,
      image,
      googleId,
      userStatusId: constants.USER_STATUS.PENDING,
      freeToBePaidRevenue: REVENUE_DEFAULT_VALUE,
      accPaidRevenue: REVENUE_DEFAULT_VALUE,
    });

    await sendEmail({
      email: user.email,
      type: 'verify',
      name: user.name,
    });

    res
      .status(CREATED)
      .json({ message: constants.MESSAGES.authResponse.SUCCESS });
  } catch (error) {
    next(error);
  }
};
