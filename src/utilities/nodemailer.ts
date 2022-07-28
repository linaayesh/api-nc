import { createTransport } from 'nodemailer';
import config from '../config';

const { APP_MAIL, MAIL_PASSWORD } = config.server;

export default async (to: string, subject: string, content: string):Promise<void> => {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: APP_MAIL,
      pass: MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: APP_MAIL,
    to,
    subject,
    html: content,
  });
};
