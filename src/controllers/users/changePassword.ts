import { Response, NextFunction, Request } from 'express';
import { User } from 'db-models-nc';
import { compare, hash } from 'bcrypt';
import { CustomError, constants, dto } from '../../helpers';

export default async (request: Request, res: Response, next: NextFunction): Promise<void> => {
  const { oldPassword, password } = dto.usersDTO.resetPasswordDTO(request);
  const { HttpStatus, MESSAGES, SALT_ROUNDS } = constants;

  try {
    const user = request.app.get('user');
    const isMatch = await compare(oldPassword, user.password as string);

    if (!isMatch) {
      throw new CustomError(
        MESSAGES.authResponse.INCORRECT_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hash(password, SALT_ROUNDS);

    await User.update(
      { password: hashedPassword },
      { where: { id: user.id } },
    );

    res.json({ message: MESSAGES.authResponse.PASSWORD_CHANGED });
  } catch (error) {
    next(error);
  }
};
