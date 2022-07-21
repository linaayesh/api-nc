import sgMail from '@sendgrid/mail';
import config from '../config';
import { IEmailService, EmailType } from '../interfaces';

sgMail.setApiKey(config.server.SENDGRID_API_KEY);

export default async ({
  email,
  type,
  username,
  redirectURL,
  contactUs,
}: IEmailService): Promise<any> => {
  try {
    const templateType: {[key: string]: string} = {
      verify: config.server.SENDGRID_VERIFICATION_TEMPLATE_ID,
      reset: config.server.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
      approve: config.server.SENDGRID_APPROVAL_TEMPLATE_ID,
      reject: config.server.SENDGRID_REJECTION_TEMPLATE_ID,
    };

    const message = {
      to: email,
      from: `${config.server.SENDGRID_ADMIN_EMAIL}`,
      templateId: templateType[type],
      dynamicTemplateData: {
        subject: EmailType[type as keyof typeof EmailType],
        username: username.charAt(0).toUpperCase() + username.slice(1),
        redirectURL,
        contactUs,
      },
    };

    await sgMail.send(message);
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.body);
    }
  }
};
