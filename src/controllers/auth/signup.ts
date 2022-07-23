import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import { Users } from '../../database/models';
import { checkExistence, constants } from '../../helpers';
import {
  sendEmail,
  signupSchema,
  validateError,
  signToken,
} from '../../utilities';
import config from '../../config';

export default async ({ body }: Request, res: Response, next: NextFunction):Promise<void> => {
  const { username, email, password } = body;
  const { emailCheck } = constants.messages.check;
  const { verifyToken } = constants.messages.token;

  try {
    await signupSchema.validateAsync(body);

    await checkExistence.RegistrationCheck(email);

    const hashedPassword = await hash(password, 10);
    const user = await Users.create({
      username,
      email,
      roleId: 2,
      password: hashedPassword,
      createdBy: 1,
    });

    const { id, roleId } = user;
    const token = await signToken({
      id: Number(id),
      username,
      email,
      roleId,
    }, { expiresIn: '1h' });

    await sendEmail(email, 'NextUp Comedy Email verification', `<h1>Welcome, ${username}!</h1>
    <p>Please verify your email by clicking this <a href="${config.server.serverURL}/auth/verify-email/${token}">link</a> </p>
    <br/>
    <p> Stay tuned.</p>`);

    res
      .cookie(verifyToken, token)
      .status(201)
      .json({ message: emailCheck });
  } catch (err) {
    next(validateError(err as Error));
  }
};
