import { NextFunction, Response, Request } from 'express';
import {
  constants, CustomError, upload, dto,
} from '../../helpers';
import { getUserById } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { httpStatus, userRoles, messages } = constants;
  const {
    id, image,
  } = dto.usersDTO.editProfileDTO(request);

  try {
    const currentUser = await getUserById(id);
    if (!currentUser) throw new CustomError(messages.authResponse.NOT_EXIST, httpStatus.NOT_FOUND);

    if (image) {
      const { Location } = await upload(image, id);
      currentUser.image = Location;
    }
    const user = request.app.get('user');

    currentUser.updatedBy = user.id || userRoles.SYSTEM;
    await currentUser.save();
    // ! ask Nujood about it
    // await currentUser.update({
    //   ...userUpdatedFields,
    // });

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.SUCCESS_EDIT });
  } catch (error) {
    next(error);
  }
};
