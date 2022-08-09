import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import generatePassword from 'generate-password';
import {
  checkExistence, constants, sendEmail, googleAuthentication,
} from '../../helpers';
import { addUser } from '../../services';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { CREATED } = constants.HttpStatus;
  const { tokenId } = body;
  try {
    const {
      email, username, image, googleId,
    } = await googleAuthentication(tokenId);

    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: 20, numbers: true, strict: true, lowercase: true, uppercase: true,
    });
    const hashedPassword = await hash(password, 10);

    const user = await addUser({
      username,
      email,
      userRoleId: 2,
      password: hashedPassword,
      createdBy: 1,
      image,
      googleId,
    });

    await sendEmail({
      email: user.email,
      type: 'verify',
      username: user.username,
    });

    res
      .status(CREATED)
      .json({ message: constants.messages.authResponse.SUCCESS });
  } catch (error) {
    next(error);
  }
};
