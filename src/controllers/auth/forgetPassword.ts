/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import {
  constants, checkExistence, signToken, sendEmail,
} from '../../helpers';
import { getUserByEmail } from '../../services';

// const bodyDTO = (data: unknown) => data.body;
const bodyData = (request: Request) => request.body;

type ForgetPasswordType = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const ForgetPassword: ForgetPasswordType = async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { MESSAGES, HttpStatus } = constants;
  // const emailDto = (req, body) => ({ email: body.email.toLowerCase() });
  // const { email } = req.body;
  const body = bodyData(req);
  const lowerCaseEmail = body.email.toLowerCase();

  try {
    const userData = await getUserByEmail(lowerCaseEmail);

    const user = await checkExistence.ApprovalChecks(userData);

    const {
      name, userRoleId, id,
    } = user;
    const token = await signToken({
      id: Number(id),
      name,
      email: lowerCaseEmail,
      roleId: userRoleId,
    }, { expiresIn: '1h' });

    const redirectURL = `${config.server.SERVER_URL}/api/v1/auth/reset-password/${token}`;

    await sendEmail({
      email: lowerCaseEmail,
      type: 'reset',
      name,
      redirectURL,
    });

    res
      .cookie(MESSAGES.token.resetToken, token)
      .status(HttpStatus.OK)
      .json({ message: MESSAGES.check.RESET_EMAIL_CHECK });
  } catch (err) {
    next(err);
  }
};

export default ForgetPassword;
