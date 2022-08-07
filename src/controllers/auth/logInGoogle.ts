import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import config from '../../config';
import {
  checkExistence, constants, validateError, signToken,
} from '../../helpers';

export default async ({ body }: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { tokenId } = body;
  try {
    const { logIn } = constants.messages.authResponse;
    const { accessToken } = constants.messages.token;

    // TODO: separate signUp with Google steps
    const client = new OAuth2Client(config.server.CLIENT_ID);
    const verify = async ():Promise<void> => {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: config.server.CLIENT_ID,
      });
      ticket.getPayload();
    };

    verify().catch(console.error);
    const {
      data: {
        sub,
        email,
      },
    } = await axios.get(
      `${config.server.GOOGLE_API}tokeninfo?id_token=${tokenId}`,
    );

    const user = await checkExistence.ApprovalChecks(email);

    if (user.googleId !== sub) res.status(401).json({ message: 'unAuthorized test' });

    const { id, username, userRoleId } = user;

    const token = await signToken({
      id: Number(id), username, email, userRoleId,
    }, { expiresIn: '24h' });

    res.status(200).cookie(accessToken, token, { httpOnly: true }).json({
      message: logIn,
      payload: {
        id: Number(id), username, email, userRoleId,
      },
    });
  } catch (error) {
    next(validateError(error as Error));
  }
};
