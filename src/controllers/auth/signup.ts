import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import { Users } from '../../database/models';
import {
  CustomError,
  sendEmail,
  signupSchema,
  validateError,
  signToken,
} from '../../utilities';
import config from '../../config';

export default async ({ body }: Request, res: Response, next: NextFunction):Promise<void> => {
  const { username, email, password } = body;

  try {
    await signupSchema.validateAsync(body);
    const userExists = await Users.findOne({ where: { email } });
    if (userExists?.isApproved) throw new CustomError('This email is already used, and it is approved', 409);
    if (userExists?.isRejected) throw new CustomError('This email is already used, and it is rejected', 409);
    if (userExists) throw new CustomError('This email is already used, waiting for approval', 409);
    const hashedPassword = await hash(password, 10);
    const user = await Users.create({
      username,
      email,
      roleId: 2,
      password: hashedPassword,
      createdBy: 1,
    });
    const token = await signToken({
      id: Number(user.id),
      username,
      email,
      roleId: user.roleId || 0,
    }, { expiresIn: '1h' });
    await sendEmail(email, 'NextUp Comedy Email verification', `<h1>Welcome, ${username}!</h1>
    <p>Please verify your email by clicking this <a href="${config.server.serverURL}auth/verify-email/${token}">link</a> </p>
    <br/>
    <p> Stay tuned.</p>`);
    res
      .cookie('verifyEmailToken', token)
      .status(201)
      .json({ message: 'Check your email.' });
  } catch (err) {
    next(validateError(err as Error));
  }
};
