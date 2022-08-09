import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  checkExistence, constants, sendEmail,
} from '../../helpers';
// import config from '../../config';
import { addUser } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction):Promise<void> => {
  const { username, email, password } = body;
  const { CREATED } = constants.HttpStatus;

  try {
    const lowercaseEmail = email.toLowerCase();

    await checkExistence.RegistrationCheck(lowercaseEmail);

    const hashedPassword = await hash(password, 10);

    const user = await addUser({
      username,
      email: email.toLowerCase(),
      userRoleId: constants.USER_ROLES.COMEDIAN,
      password: hashedPassword,
      createdBy: constants.USER_ROLES.SYSTEM_ADMIN,
    });

    await sendEmail({
      email: user.email,
      type: 'verify',
      username: user.username,
    });
    res
      .status(CREATED)
      .json({ message: constants.messages.authResponse.SUCCESS });
  } catch (err) {
    next(err);
  }
};
