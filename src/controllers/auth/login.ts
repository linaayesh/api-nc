import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { Users } from '../../database/models';
import {
  loginSchema, signToken, validateError, CustomError,
} from '../../utilities';

export default async ({ body }: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password } = body;

  try {
    await loginSchema.validateAsync(body);
    const user = await Users.findOne({ where: { email } });
    if (!user) throw new CustomError('Incorrect email or password', 400);
    if (!user.isApproved) throw new CustomError('Unauthorized', 401);
    const isValid = await compare(password, user.password);
    if (!isValid) next(new CustomError('Incorrect email or password', 400));
    const { id, username, roleId } = user;
    const token = await signToken({
      id: Number(id), username, email, roleId,
    });
    res.cookie('accessToken', token).json({ message: 'User logged in successfully' });
  } catch (err) {
    next(validateError(err as Error));
  }
};
