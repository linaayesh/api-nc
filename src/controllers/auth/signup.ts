import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  checkExistence, constants, sendEmail, signToken,
} from '../../helpers';
import config from '../../config';
import { addUser } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction):Promise<void> => {
  const { username, email, password } = body;
  const { emailCheck } = constants.messages.check;
  const { verifyToken } = constants.messages.token;

  try {
    await checkExistence.RegistrationCheck(email);

    const hashedPassword = await hash(password, 10);

    const user = await addUser({
      username,
      email,
      userRoleId: 2,
      password: hashedPassword,
      createdBy: 1,
    });

    const { id, userRoleId } = user;
    const token = await signToken({
      id: Number(id),
      username,
      email,
      userRoleId,
    }, { expiresIn: '1h' });

    const redirectURL = `${config.server.SERVER_URL}/api/v1/auth/verify-email/${token}`;

    await sendEmail({
      email, type: 'verify', username, redirectURL,
    });

    res
      .cookie(verifyToken, token)
      .status(201)
      .json({ message: emailCheck });
  } catch (err) {
    next(err); // TODO: handle internal server error
  }
};
