import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  checkExistence, constants, sendEmail, dto,
} from '../../helpers';
import { addUser } from '../../services';

export default async (request: Request, res: Response, next: NextFunction):Promise<void> => {
  const { name, email, password } = dto.authDTO.signupDTO(request);
  const { HttpStatus, USER_ROLES, EMAIL_TYPE } = constants;

  try {
    await checkExistence.RegistrationCheck(email);

    const hashedPassword = await hash(password, 10);

    const user = await addUser({
      name,
      email,
      userRoleId: USER_ROLES.COMEDIAN,
      password: hashedPassword,
      createdBy: USER_ROLES.SYSTEM,
      updatedBy: USER_ROLES.SYSTEM,
      userStatusId: constants.USER_STATUS.PENDING,
      accPaidRevenue: constants.REVENUE_DEFAULT_VALUE,
      freeToBePaidRevenue: constants.REVENUE_DEFAULT_VALUE,
    });

    await sendEmail({
      email: user.email,
      type: EMAIL_TYPE.VERIFY,
      name: user.name,
    });

    res
      .status(HttpStatus.CREATED)
      .json({ message: constants.MESSAGES.authResponse.SUCCESS });
  } catch (err) {
    next(err);
  }
};
