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
  roleId:number
  email:string
  username:string
  role?:string
}

interface IServer{
  secretKey: Secret;
  appMail: string;
  mailPassword: string;
  port: string;
  clientURL: string;
  serverURL: string;
  clientId: string;
  googleAPI: string;
}

interface IDatabase{
url:string
}
interface UserAuth extends Request {
  user?: IUser,
  admin?: { id: number, email: string, role: string },
}

interface GoogleUserRequest extends Request {
  googleUserData: { sub: string,
    email: string,
    isVerified: string,
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
  roleId: number;
  isVerified?: boolean,
  status?: string;
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
  createdBy: number,
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
