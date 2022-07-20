/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import generatePassword from 'generate-password';
import { Users } from '../../database/models';
import {
  CustomError,
  validateError,
  signToken,
} from '../../utilities';
import config from '../../config';

export default async ({ body }: Request, res: Response, next: NextFunction):Promise<void> => {
  const { tokenId } = body;
  try {
    const client = new OAuth2Client(config.server.clientId);
    const verify = async () => {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: config.server.clientId,
      });
      const payload = ticket.getPayload();
      const userid = payload?.sub;
    };
    verify().catch(console.error);

    const {
      data: {
        sub,
        email,
        email_verified: emailVerified,
        name,
        // picture,
      },
    } = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`,
    );
    const userExists = await Users.findOne({ where: { email } });
    if (userExists?.isRejected) throw new CustomError('Sorry to inform you that this account is rejected', 409);
    if (userExists?.isApproved) {
      const { id, username, roleId } = userExists;
      const token = await signToken({
        id: Number(id), username, email, roleId: roleId || 0,
      }, {});
      res.cookie('accessToken', token, { httpOnly: true }).json({
        message: 'Logged in successfully',
        payload: {
          id: Number(id), username, email, roleId,
        },
      });
    }
    if (userExists) throw new CustomError('This account is waiting for the admin approval', 409);
    const password = generatePassword.generate({ length: 10, numbers: true });
    console.log(password);
    const hashedPassword = await hash(password, 10);
    await Users.create({
      username: name,
      email,
      roleId: 2,
      password: hashedPassword,
      createdBy: 1,
      isVerified: emailVerified,
      // image: picture,
      googleId: sub,
    });
    // redirect to page from frontend that say waiting for admins approval
    res.status(302).redirect(`${config.server.clientURL}/verifyEmail`);
  } catch (error) {
    next(validateError(error as Error));
  }
};
