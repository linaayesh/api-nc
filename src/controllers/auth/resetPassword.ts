import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  CustomError,
  validateError,
  verifyToken,
} from '../../utilities';
import { Users } from '../../database/models';
import config from '../../config';

export default async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { password } = req.body;
  try {
    const { resetPasswordToken } = req.cookies;
    if (!resetPasswordToken) throw new CustomError('Unauthorized User', 401);
    const user: any = await verifyToken(resetPasswordToken);
    const userData: any = await Users.findOne({ where: { email: user.email } });
    const hashedPassword = await hash(password, 10);
    userData.password = hashedPassword;
    await userData.save();
    res.status(201).clearCookie('resetPasswordToken').redirect(config.server.clientURL);
  } catch (err) {
    next(validateError(err as Error));
  }
};
