import {
  InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

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
  userRoleId:number
  email:string
  username: string,
  image?: string,
  role?: string,
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
  username: string,
}

interface IUsers extends Model<
  InferAttributes<IUsers>, InferCreationAttributes<IUsers>
> {
  id?: number;
  username: string;
  email: string;
  password: string;
  userRoleId: number;
  userStatusId: number;
  googleId?: string;
  accPaidRevenue?: number;
  freeToBePaidRevenue?: number;
  createdBy?: number;
  updatedBy?: number;
  image?: string;
  reasonOfRejection?: string;
}
interface FinancialInformation {
  id?: number,
  userId: number,
  name: string,
  address: string,
  createdBy?: number,
  updatedBy?: number,
}

interface IPayments extends Model<
  InferAttributes<IPayments>, InferCreationAttributes<IPayments>
> {
  id?: number;
  userId?: number;
  name: string;
  address: string;
  method_id?: number;
  updatedBy?: number;
  createdBy?: number;
}

interface UserAuth extends Request {
  user?: IUsers,
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
  IUser,
  IServer,
  IDatabase,
  UserAuth,
  ApprovedUser,
  GoogleUserRequest,
  IUsers,
  ErrorWithDetails,
  IPayments,
  FinancialInformation,
};
