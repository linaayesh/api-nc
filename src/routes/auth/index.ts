import { Router } from 'express';

import { checkUserRole } from '../../middleware';

import {
  signupHandler, loginHandler, userAuth, forgetPassword, resetPasswordEmail,
  logInGoogle, resetPassword, logOut, signUpGoogle, editProfile,
} from '../../controllers';

import {
  constants, validator, loginSchema, signupSchema, emailSchema, passwordSchema, editProfileSchema,
} from '../../helpers';

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.USER_ROLES;

const router = Router();

router.post('/login', validator.body(loginSchema), loginHandler);
router.post('/signup', validator.body(signupSchema), signupHandler);

router.post('/log/google', logInGoogle);
router.post('/sign/google', signUpGoogle);

router.get('/reset-password/:token', resetPasswordEmail);
router.post('/forget-password', validator.body(emailSchema), forgetPassword);
router.post('/reset-password', validator.body(passwordSchema), resetPassword);

<<<<<<< HEAD
router.use(checkUserRole([ADMIN, MASTER_ADMIN, COMEDIAN]));
=======
router.use(checkUserRole([SYSTEM, COMEDIAN]));
>>>>>>> 8023bce83c01023f5b5b6e97afb000dce02e475c

router.get('/user', userAuth);
router.patch('/edit-profile', validator.body(editProfileSchema), editProfile);
router.get('/logout', logOut);

export default router;
