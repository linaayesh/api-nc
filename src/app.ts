import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './routes';
import { notFound, serverError } from './middleware';

const app: Application = express();
app.disable('x-powered-by');

app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  compression(),
  cookieParser(),
  cors(),
]);

app.get('/', (req, res) => res.json({ message: 'Server Is Running' }));

app.use('/api/v1', router);
app.use([notFound, serverError]);

export default app;
