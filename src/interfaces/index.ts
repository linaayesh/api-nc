import { IUser } from 'db-models-nc';
import {
  Secret,
} from 'jsonwebtoken';
import { Request } from 'express';

interface IServerAddress{
  port: number;
  address: string;
}

interface IUserInfo{
  id: number;
  roleId: number;
  email: string;
  name: string;
  image?: string;
  role?: string;
}

interface IServer{
  SECRET_KEY: Secret;
  APP_MAIL: string;
  MAIL_PASSWORD: string;
  PORT: string;
  CLIENT_URL: string;
  SERVER_URL: string;
  CLIENT_ID: string;
  GOOGLE_API: string;
  AWS_BUCKET_NAME: string;
  AWS_BUCKET_REGION: string,
  AWS_ACCESS_KEY_ID: string,
  AWS_SECRET_ACCESS_KEY: string,
}

interface IDatabase{
url:string
}
interface GoogleUserRequest extends Request {
  googleUserData: { sub: string,
    email: string,
    name: string,
    image: string, },
}

interface ApprovedUser {
  id: number,
  email: string,
  roleId: number,
  name: string,
}

interface FinancialInformation {
  id?: number,
  userId: number,
  name: string,
  address: string,
  createdBy?: number,
  updatedBy?: number,
}

interface UserAuth extends Request {
  user?: IUser,
  admin?: { id: number, email: string, role: string },
}
interface ErrorWithDetails extends Error {
  details: [
    {
      message: string
    }
  ];
 }

export {
  IServerAddress,
  IUserInfo,
  IServer,
  IDatabase,
  UserAuth,
  ApprovedUser,
  GoogleUserRequest,
  IUser,
  ErrorWithDetails,
  FinancialInformation,
};
