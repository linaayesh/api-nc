import { Response, NextFunction, Request } from 'express';
import { hash } from 'bcrypt';
import generatePassword from 'generate-password';
import {
  checkExistence, constants, sendEmail, dto,
} from '../../helpers';
import { addUser } from '../../services';

export default async (request: Request, response: Response, next: NextFunction):Promise<void> => {
  const {
    name, email, roleId,
  } = dto.adminDTO.addUserDTO(request);
  const {
    httpStatus,
    userStatus,
    PASSWORD_LENGTH,
    emailType,
    SALT_ROUNDS,
    REVENUE_DEFAULT_VALUE,
    messages,
  } = constants;

  try {
    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: PASSWORD_LENGTH, numbers: true, strict: true, lowercase: true, uppercase: true,
    });
    const hashedPassword = await hash(password, SALT_ROUNDS);

    const loginUser = request.app.get('user');

    const user = await addUser({
      name,
      email: email.toLowerCase(),
      userRoleId: roleId,
      password: hashedPassword,
      createdBy: loginUser.id,
      updatedBy: loginUser.id,
      userStatusId: userStatus.APPROVED,
      accPaidRevenue: REVENUE_DEFAULT_VALUE,
      freeToBePaidRevenue: REVENUE_DEFAULT_VALUE,
    });

    await sendEmail({
      email: user.email,
      type: emailType.CREATE,
      name: user.name,
      password,
    });

    response
      .status(httpStatus.CREATED)
      .json({ message: messages.authResponse.SUCCESS_ADD_USER, data: user });
  } catch (error) {
    next(error);
  }
};
