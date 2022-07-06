/* eslint-disable no-console */
import dotenv from 'dotenv';
import { sequelize } from '.';

dotenv.config();

const { env: { NODE_ENV } } = process;

const buildDB = async ():Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database Built Successfully');
  } catch (err) {
    console.error('Error while connecting to DB');
  }
};

if (NODE_ENV === 'development') buildDB();

export default buildDB;
