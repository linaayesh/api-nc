import { NextFunction, Response, Request } from 'express';
import { constants, CustomError, upload } from '../../helpers';
import { getUserById } from '../../services';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { HttpStatus, USER_ROLES } = constants;
  const { notExist, edit } = constants.MESSAGES.authResponse;
  const {
    id, image, ...userUpdatedFields
  } = req.body;

  try {
    const currentUser = await getUserById(id);
    if (!currentUser) throw new CustomError(notExist, HttpStatus.NOT_FOUND);

    if (image) {
      const { Location } = await upload(image, id);
      userUpdatedFields.image = Location;
    }
    const user = req.app.get('user');

    userUpdatedFields.updatedBy = user.id || USER_ROLES.SYSTEM;

    await currentUser.update({
      ...userUpdatedFields,
    });

    res.status(HttpStatus.OK).json({ message: edit });
  } catch (error) {
    next(error);
  }
};
