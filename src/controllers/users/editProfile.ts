import { NextFunction, Response } from 'express';
import { UserAuth } from '../../interfaces';
import { constants, CustomError, upload } from '../../helpers';
import { getUserById } from '../../services';

export default async (req: UserAuth, res: Response, next: NextFunction)
:Promise<void> => {
  const { HttpStatus } = constants;
  const { notExist, edit } = constants.messages.authResponse;
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
    userUpdatedFields.updatedBy = req.user?.id;

    await currentUser.update({
      ...userUpdatedFields,
    });

    res.status(HttpStatus.OK).json({ message: edit });
  } catch (error) {
    next(error);
  }
};
