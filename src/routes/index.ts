import { Router } from 'express';
import authRouter from './auth';
import userRouter from './users';
import contentRouter from './contents';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/content', contentRouter);

export default router;
