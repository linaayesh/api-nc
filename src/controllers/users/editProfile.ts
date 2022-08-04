import { NextFunction, Response } from 'express';

import upload from '../../middleware/uploadImage';
import { Users } from '../../database/models';
import { CustomError, editProfileValidation, validateError } from '../../utilities';
import { UserAuth, IUsers } from '../../interfaces';
import { messages } from '../../helpers/constants';

export default async (req: UserAuth, res: Response, next: NextFunction)
:Promise<void> => {
  const {
    id, image, ...userUpdatedFields
  } = req.body;

  try {
    await editProfileValidation.validateAsync({ ...req.body });

    const currentUser = await Users.findOne({ where: { id }, attributes: ['id'] });

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
    next(validateError(error as Error));
  }
};
