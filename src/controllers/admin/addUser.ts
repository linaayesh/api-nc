import { Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import generatePassword from 'generate-password';
import {
  checkExistence, constants, sendEmail, dto, errorMessages,
} from '../../helpers';
import { addUser } from '../../services';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const {
    name, email, roleId, currentUser,
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
    if (!currentUser || !currentUser.id) throw errorMessages.NOT_EXIST_USER_ERROR;

    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: PASSWORD_LENGTH, numbers: true, strict: true, lowercase: true, uppercase: true,
    });
    const hashedPassword = await hash(password, SALT_ROUNDS);

    const user = await addUser({
      name,
      email: email.toLowerCase(),
      userRoleId: roleId,
      password: hashedPassword,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
      userStatusId: userStatus.APPROVED,
      totalRevenue: REVENUE_DEFAULT_VALUE,
      paidRevenue: REVENUE_DEFAULT_VALUE,
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
