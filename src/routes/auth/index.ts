import { Router } from 'express';

import {
  signupHandler, loginHandler, verifyEmailHandler, userAuth, forgetPassword, resetPasswordEmail,
  resetPassword, logOut, signUpGoogle,
} from '../../controllers';

const router = Router();

router.get('/logout', logOut);
router.post('/signup', signupHandler);
router.get('/verify-email/:token', verifyEmailHandler);
router.get('/reset-password/:token', resetPasswordEmail);
router.post('/login', loginHandler);
router.get('/userAuth', userAuth);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', resetPassword);
router.post('/sign/google', signUpGoogle);

export default router;
