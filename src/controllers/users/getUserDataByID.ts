import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../../services';
import { messages, HttpStatus } from '../../helpers/constants';

const getUserDataByID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await getUserById(+userId);
    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({ message: messages.authResponse.notExist });

      return;
    }
    res.status(HttpStatus.OK).json(user);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export default getUserDataByID;
