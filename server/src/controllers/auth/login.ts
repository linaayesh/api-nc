import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { Roles, Users } from '../../database/models';
import {
  loginSchema, signToken, validateError, CustomError,
} from '../../utilities';

export default async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = body;

  try {
    await loginSchema.validateAsync(body);
    const user = await Users.findOne({ where: { email } });
    if (!user) throw new CustomError('Incorrect email or password', 400);
    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError('Incorrect email or password', 400);
    const id = Number(user.id);
    const userRole = await Roles.findOne({ where: { id } });
    const token = await signToken({ id, role: userRole?.name, email });
    res.cookie('access_token', token).json({ message: 'User logged in successfully' });
  } catch (err) {
    next(validateError(err as Error));
  }
};
