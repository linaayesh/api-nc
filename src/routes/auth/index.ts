import { Router } from 'express';
import { checkUserRole } from '../../middleware';

import {
  signupHandler, loginHandler, userAuth, forgetPassword,
  logInGoogle, resetPassword, logOut, signUpGoogle,
} from '../../controllers';

import {
  constants, validator, loginSchema, signupSchema, emailSchema, passwordSchema,
} from '../../helpers';

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.USER_ROLES;

const router = Router();

router.post('/login', validator.body(loginSchema), loginHandler);
router.post('/signup', validator.body(signupSchema), signupHandler);

router.post('/log/google', logInGoogle);
router.post('/sign/google', signUpGoogle);

router.post('/forget-password', validator.body(emailSchema), forgetPassword);
router.post('/reset-password', validator.body(passwordSchema), resetPassword);

router.use(checkUserRole([ADMIN, MASTER_ADMIN, COMEDIAN]));

router.get('/user', userAuth);
router.get('/logout', logOut);

export default router;
