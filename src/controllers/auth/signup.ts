import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import { Users } from '../../database/models';
import {
  CustomError,
  sendEmail,
  signupSchema,
  validateError,
} from '../../utilities';

export default async ({ body }: Request, res: Response, next: NextFunction):Promise<void> => {
  const { username, email, password } = body;

  try {
    await signupSchema.validateAsync(body);
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) throw new CustomError('User already exists', 409);
    const hashedPassword = await hash(password, 10);
    await Users.create({
      username,
      email,
      roleId: 2,
      password: hashedPassword,
      createdBy: 1, // 1 refer to the system => he create his own account
    });

    await sendEmail(email, 'Welcome to NextUp Comedy Dashboard', `<h1>Welcome, ${username}!</h1>
    <p>Wait for Our NextUp Comedy Stuff to approve your account. We will send you an email when your account is approved. </p>
    <br/>
    <p> Stay tuned.</p>`);
    res
      .status(201)
      .json({ message: 'Sign up successfully. Please Check your email.' });
  } catch (err) {
    next(validateError(err as Error));
  }
};
