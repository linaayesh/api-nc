import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../../services';
import { constants, errorMessages } from '../../helpers';

const getUserDataByID = async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus, messages } = constants;
  try {
    const { userId } = request.params;

    const user = await getUserById(+userId);
    if (!user) throw errorMessages.NOT_EXIST_ERROR;

    response.status(httpStatus.OK).json({ message: messages.authResponse.SUCCESS, data: user });
  } catch (error) {
    next(error);
  }
};

export default getUserDataByID;
