import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  checkExistence, constants,
} from '../../helpers';
import config from '../../config';
import { addUser } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction):Promise<void> => {
  const { username, email, password } = body;
  const { REDIRECT } = constants.HttpStatus;

  try {
    const lowercaseEmail = email.toLowerCase();

    await checkExistence.RegistrationCheck(lowercaseEmail);

    const hashedPassword = await hash(password, 10);
    // TODO: userRoleId from the body, Created by Whom
    await addUser({
      username,
      email: email.toLowerCase(),
      userRoleId: constants.USER_ROLES.COMEDIAN,
      password: hashedPassword,
      createdBy: constants.USER_ROLES.SYSTEM_ADMIN,
    });
    // ! new end point to FrontEnd
    const redirectURL = `${config.server.CLIENT_URL}/waitingApproval`;
    res
      .status(REDIRECT)
      .redirect(redirectURL);
  } catch (err) {
    next(err);
  }
};
