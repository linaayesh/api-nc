import { NextFunction, Response } from 'express';
import upload from '../../middleware/uploadImage';
import { UserAuth, IUsers } from '../../interfaces';
import { constants, CustomError } from '../../helpers';
import { getUserById } from '../../services';

export default async (req: UserAuth, res: Response, next: NextFunction)
:Promise<void> => {
  const { messages } = constants;
  const {
    id, image, ...userUpdatedFields
  } = req.body;

  try {
    const currentUser = await getUserById(id);

    if (!currentUser) {
      throw new CustomError(messages.authResponse.notExist, 404);
    }

    if (image) {
      const { Location } = await upload(image, id);
      userUpdatedFields.image = Location;
    }

    const user : IUsers = await currentUser.update({
      ...userUpdatedFields,
    }); // remove this any & update the interface

    if (!user) throw new CustomError(messages.authResponse.conflict, 409);

    res.status(200).json({ message: messages.authResponse.edit });
  } catch (error) {
    next(error);
  }
};
