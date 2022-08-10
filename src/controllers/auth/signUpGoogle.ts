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
      email, name, image, googleId,
    } = await googleAuthentication(tokenId);

    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: 20, numbers: true, strict: true, lowercase: true, uppercase: true,
    });
    const hashedPassword = await hash(password, 10);

    const user = await addUser({
      name,
      email,
      userRoleId: 2,
      password: hashedPassword,
      createdBy: 1,
      image,
      googleId,
      freeToBePaidRevenue: 0,
      accPaidRevenue: 0,
    });

    await sendEmail({
      email: user.email,
      type: 'verify',
      name: user.name,
    });

    res
      .status(CREATED)
      .json({ message: constants.messages.authResponse.SUCCESS });
  } catch (error) {
    next(error);
  }
};
