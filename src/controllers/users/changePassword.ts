import { Response, NextFunction, Request } from 'express';
import { compare, hash } from 'bcrypt';
import { CustomError, constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { oldPassword, password } = dto.usersDTO.resetPasswordDTO(request);
  const { httpStatus, messages, SALT_ROUNDS } = constants;

  try {
    const user = request.app.get('user');
    const isMatch = await compare(oldPassword, user.password as string);

    if (!isMatch) {
      throw new CustomError(
        messages.authResponse.INCORRECT_PASSWORD,
        httpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hash(password, SALT_ROUNDS);

    user.password = hashedPassword;
    await user.save();

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.PASSWORD_CHANGED });
  } catch (error) {
    next(error);
  }
};
