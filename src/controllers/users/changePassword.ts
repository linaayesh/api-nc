import { Response, NextFunction } from 'express';
import { User } from 'db-models-nc';
import { compare, hash } from 'bcrypt';
import { UserAuth } from '../../interfaces';
import { CustomError, constants } from '../../helpers';

export default async (req: UserAuth, res: Response, next: NextFunction): Promise<void> => {
  const { body: { oldPassword, password }, user } = req;
  const { HttpStatus, messages } = constants;

  try {
    const isMatch = await compare(oldPassword, user?.password as string);

    if (!isMatch) {
      throw new CustomError(
        messages.authResponse.INCORRECT_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hash(password, 10);

    await User.update(
      { password: hashedPassword },
      { where: { id: user?.id } },
    );

    res.json({ message: messages.authResponse.PASSWORD_CHANGED });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
