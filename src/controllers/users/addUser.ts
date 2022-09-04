import { Response, NextFunction, Request } from 'express';
import { hash } from 'bcrypt';
import generatePassword from 'generate-password';
import {
  checkExistence, constants, sendEmail, dto,
} from '../../helpers';
import { addUser } from '../../services';

export default async (request: Request, res: Response, next: NextFunction):Promise<void> => {
  const {
    name, email, roleId,
  } = dto.usersDTO.addUserDTO(request);
  const {
    HttpStatus, USER_STATUS, PASSWORD_LENGTH, EMAIL_TYPE, SALT_ROUNDS,
  } = constants;

  try {
    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: PASSWORD_LENGTH, numbers: true, strict: true, lowercase: true, uppercase: true,
    });
    const hashedPassword = await hash(password, SALT_ROUNDS);

    const test = request.app.get('user');

    const user = await addUser({
      name,
      email: email.toLowerCase(),
      userRoleId: roleId,
      password: hashedPassword,
      createdBy: test.id,
      updatedBy: test.id,
      userStatusId: USER_STATUS.APPROVED,
      accPaidRevenue: constants.REVENUE_DEFAULT_VALUE,
      freeToBePaidRevenue: constants.REVENUE_DEFAULT_VALUE,
    });

    await sendEmail({
      email: user.email,
      type: EMAIL_TYPE.CREATE,
      name: user.name,
      password,
    });
    res
      .status(HttpStatus.CREATED)
      .json({ message: constants.MESSAGES.authResponse.SUCCESS, data: user });
  } catch (err) {
    next(err);
  }
};
