import { Request, Response, NextFunction } from 'express';
// import { Users } from '../../database/models';
import { verifyToken } from '../../utilities/jwt';
import config from '../../config';
import { constants, CheckUserExistence } from '../../helpers';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const token: string | undefined = req.params?.token;
  const { verifyCheck } = constants.messages.check;
  // const { verify } = constants.messages.authResponse;

  try {
    const { email } = await verifyToken(token);

    const user = await CheckUserExistence(email, verifyCheck);
    user.isVerified = true;
    await user.save();
    // const [userVerified] = await Users.update({ isVerified: true }, { where: { id } });
    // if (userVerified) {
    res.status(302).redirect(`${config.server.clientURL}/verifyEmail`);
    // }
  } catch (err) {
    next(err);
  }
};
