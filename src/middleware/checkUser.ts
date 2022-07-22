/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Response, NextFunction, Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import config from '../config';
import { Users } from '../database/models';
import { GoogleUserRequest } from '../interfaces';
import { CustomError } from '../utilities';

export default async (req: GoogleUserRequest, res: Response, next: NextFunction)
:Promise<void> => {
  try {
    console.log('from check user middleware', req.body);
    const {
      tokenId, username, email: userEmail, password,
    } = req.body;
    if (tokenId) {
      const client = new OAuth2Client(config.server.clientId);
      const verify = async () => {
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: config.server.clientId,
        });
        ticket.getPayload();
        // return;
      };
      verify().catch(console.error);
      const {
        data: {
          sub,
          email,
          email_verified: isVerified,
          name,
          picture: image,
        },
      } = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`,
      );
      const userExists = await Users.findOne({ where: { email } });
      if (userExists?.isApproved) throw new CustomError('APPROVED ACCOUNT', 401);
      if (userExists?.isRejected) throw new CustomError('REJECTED ACCOUNT', 401);
      if (userExists) throw new CustomError('WAITING APPROVAL', 409);
      req.googleUserData = {
        sub,
        email,
        isVerified,
        name,
        image,
      };
      next();
    }
    // next();
  } catch (err: any) {
    if (err.details) { next(new CustomError(err.details[0].message, 401)); }
    next(err);
  }
};
