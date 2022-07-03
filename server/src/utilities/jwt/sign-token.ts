import { sign, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../../interfaces';

dotenv.config();

const { JWT_SECRET } = process.env;

export default (user: IUser):Promise<string> => new Promise((resolve, reject) => {
  sign(user, JWT_SECRET as Secret, (err, token) => {
    if (err) return reject(err);
    return resolve(token as string);
  });
});
