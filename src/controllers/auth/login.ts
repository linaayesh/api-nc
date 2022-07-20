import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { Users } from '../../database/models';
import {
  loginSchema, signToken, validateError, CustomError,
} from '../../utilities';

export default async ({ body }: Request, res: Response, next: NextFunction):
Promise<void> => {
  const { email, password, rememberMe } = body;
  try {
    await loginSchema.validateAsync(body);
    let expiresIn;
    if (rememberMe) { expiresIn = '30d'; } else { expiresIn = '1h'; }
    const user = await Users.findOne({ where: { email } });
    if (!user) throw new CustomError('User does not exist. please SignUp', 400);
    if (!user.isApproved) throw new CustomError('Unauthorized To log in', 401);
    if (user.isRejected) throw new CustomError('Sorry to form you that your Account has been Rejected', 401);
    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError('Incorrect email or password => password wrong', 400);
    const { id, username, roleId } = user;
    const token = await signToken({
      id: Number(id), username, email, roleId: roleId || 0,
    }, { expiresIn });
    res.cookie('accessToken', token, { httpOnly: true }).json({
      message: 'Logged in successfully',
      payload: {
        id: Number(id), username, email, roleId,
      },
    });
  } catch (err) {
    next(validateError(err as Error));
  }
};
