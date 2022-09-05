import { NextFunction, Response, Request } from 'express';
import {
  constants, errorMessages, upload, dto,
} from '../../helpers';
import { getUserById } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { httpStatus, userRoles, messages } = constants;
  const {
    id, image, name,
  } = dto.usersDTO.editProfileDTO(request);

  try {
    const currentUser = await getUserById(id);
    if (!currentUser) throw errorMessages.NOT_EXIST_ERROR;

    if (image) {
      const { Location } = await upload(image, id);
      currentUser.image = Location;
    }

    if (name) { currentUser.name = name; }

    const user = request.app.get('user');

    currentUser.updatedBy = user.id || userRoles.SYSTEM;
    await currentUser.save();

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.SUCCESS_EDIT });
  } catch (error) {
    next(error);
  }
};
