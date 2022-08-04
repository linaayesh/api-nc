import { Router } from 'express';

import { checkUserRole } from '../../middleware';
import {
  signupHandler, loginHandler, verifyEmailHandler, userAuth, forgetPassword, resetPasswordEmail,
  logInGoogle, resetPassword, logOut, signUpGoogle, editProfile,
} from '../../controllers';
import { USER_ROLES } from '../../helpers/constants';

const { SYSTEM_ADMIN, COMEDIAN } = USER_ROLES;
const router = Router();

router.post('/login', loginHandler);
router.post('/log/google', logInGoogle);
router.post('/signup', signupHandler);
router.post('/sign/google', signUpGoogle);

router.get('/verify-email/:token', verifyEmailHandler);
router.get('/reset-password/:token', resetPasswordEmail);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

router.use(checkUserRole([SYSTEM_ADMIN, COMEDIAN]));

router.get('/user', userAuth);
router.patch('/edit-profile', editProfile);
router.get('/logout', logOut);

export default router;
