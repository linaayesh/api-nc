import { Router } from 'express';

import {
  signupHandler, loginHandler, verifyEmailHandler, userAuth, forgetPassword, resetPassword,
} from '../../controllers';

const router = Router();

router.post('/signup', signupHandler);
router.get('/verify-email/:token', verifyEmailHandler);
router.get('/reset-password/:token', resetPassword);
router.post('/login', loginHandler);
router.get('/userAuth', userAuth);
router.post('/forgetPassword', forgetPassword);

export default router;
