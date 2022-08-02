import { NextFunction, Response } from 'express';
import { Users } from '../../database/models';
import { CustomError, editProfileValidation, validateError } from '../../utilities';
import { UserAuth } from '../../interfaces';
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

    const user : any = await currentUser.update({
      ...userUpdatedFields,
    }); // remove this any & update the interface

    if (!user.dataValues) throw new CustomError(messages.authResponse.conflict, 409);

    res.status(200).json({ message: messages.authResponse.edit });
  } catch (error) {
    next(validateError(error as Error));
  }
};
