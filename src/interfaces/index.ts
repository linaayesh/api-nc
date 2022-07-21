import {
  Secret,
} from 'jsonwebtoken';
import { Request } from 'express';

interface IServerAddress{
  port: number;
  address: string;
}

interface IUser{
  id:number
  roleId:number
  email:string
  username:string
}

interface IServer{
  secretKey: Secret;
  appMail: string;
  mailPassword: string;
  port: string;
  clientURL: string;
  serverURL: string;
  SENDGRID_ADMIN_EMAIL: string,
  SENDGRID_API_KEY: string,
  SENDGRID_VERIFICATION_TEMPLATE_ID: string,
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID: string,
  SENDGRID_APPROVAL_TEMPLATE_ID: string,
  SENDGRID_REJECTION_TEMPLATE_ID: string,
  NEXTUP_COMEDY_SUPPORT_EMAIL: string
}

enum EmailType{
  verify = 'Verification Email',
  reset = 'Reset Password',
  approve = 'Approval Email',
  reject='Rejection Email'
}

interface IEmailService{
  email: string,
  type: string,
  username: string,
  redirectURL?: string,
  contactUs?: string
}

interface IDatabase{
url:string
}
interface UserAuth extends Request {
  user?: { id: number, email: string, role: string },
  admin?: { id: number, email: string, role: string },
}

interface ApprovedUser {
  id: number,
  email: string,
  roleId: number,
  username: string,
}

export type EmailTypes = EmailType

export {
  IServerAddress, IUser, IServer, IDatabase, UserAuth, ApprovedUser, IEmailService, EmailType,
};
