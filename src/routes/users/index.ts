import { Router } from 'express';

import {
  editProfile,
  changePassword,
  getUserStatistics,
} from '../../controllers';
import {
  constants,
  validator,
  idSchema,
  changePasswordSchema,
  editProfileSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.userRoles;

router.use(checkUserRole([COMEDIAN, ADMIN, MASTER_ADMIN]));
router.patch('/change-password', validator.body(changePasswordSchema), changePassword);
router.patch('/edit-profile', validator.body(editProfileSchema), editProfile);

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/statistics/:userId', validator.params(idSchema), getUserStatistics);
router.patch('/edit-user-profile', validator.body(editProfileSchema), editProfile);

export default router;
