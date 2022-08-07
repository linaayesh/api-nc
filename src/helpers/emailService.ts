import sgMail from '@sendgrid/mail';
import { ResponseError } from '@sendgrid/helpers/classes';

import config from '../config';
import {
  IEmailService,
  EmailType,
  ClientResponse,
  MailJSON,
  EmailTypes,
} from '../interfaces/email';
import CustomError from './CustomError';

sgMail.setApiKey(config.email.SENDGRID_API_KEY);

export default async ({
  email,
  type,
  username,
  redirectURL,
  contactUs,
}: IEmailService): Promise<[ClientResponse, {}] | void> => {
  try {
    const templateType: EmailTypes = {
      verify: config.email.SENDGRID_VERIFICATION_TEMPLATE_ID,
      approve: config.email.SENDGRID_APPROVAL_TEMPLATE_ID,
      reject: config.email.SENDGRID_REJECTION_TEMPLATE_ID,
      reset: config.email.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
    };

    const message: MailJSON = {
      to: email,
      from: `${config.email.SENDGRID_ADMIN_EMAIL}`,
      templateId: templateType[type],
      dynamicTemplateData: {
        subject: EmailType[type as keyof typeof EmailType],
        username: username.charAt(0).toUpperCase() + username.slice(1),
        redirectURL,
        contactUs,
      },
    };

    await sgMail.send(message);
  } catch (error) {
    if (error instanceof ResponseError) {
      throw new CustomError(error.toString()?.split('\n ')[1], error.code);
    }
  }
};
