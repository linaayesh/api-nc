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
  clientId: string;
}
interface IDatabase{
url:string
}
interface UserAuth extends Request {
  user?: { id: number, email: string, role: string },
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

export {
  IServerAddress, IUser, IServer, IDatabase, UserAuth, ApprovedUser, GoogleUserRequest,
};
