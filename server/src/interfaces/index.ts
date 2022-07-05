import {
  Secret,
} from 'jsonwebtoken';

interface IServerAddress{
  port: number;
  address: string;
}

interface IUser{
  id:number
  role?:string
  email?:string
  username?:string
}

interface IServer{
  secretKey: Secret;
  appMail: string;
  mailPassword: string;
  port: string;
}
interface IDatabase{
url:string
}
export {
  IServerAddress, IUser, IServer, IDatabase,
};
