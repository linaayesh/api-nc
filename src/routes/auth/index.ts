import { Router } from 'express';
import { isAuth } from '../../middleware';
import {
  signupHandler, loginHandler, verifyEmailHandler, userAuth, forgetPassword, resetPasswordEmail,
  resetPassword, logOut, signUpGoogle,
} from '../../controllers';

const router = Router();

router.get('/userAuth', userAuth);
router.post('/signup', signupHandler);
router.get('/verify-email/:token', verifyEmailHandler);
router.get('/reset-password/:token', resetPasswordEmail);
router.post('/login', loginHandler);
router.post('/sign/google', signUpGoogle);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', resetPassword);

router.use(isAuth);
router.get('/logout', logOut);

export default router;
