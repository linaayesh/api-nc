import { Router } from 'express';

import {
  editProfile,
  changePassword,
  getUserStatistics,
} from '../../controllers';
import {
  constants,
  validator,
  changePasswordSchema,
  editProfileSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.userRoles;

router.use(checkUserRole([COMEDIAN, ADMIN, MASTER_ADMIN]));

router.get('/statistics', getUserStatistics);

router.patch('/change-password', validator.body(changePasswordSchema), changePassword);
router.patch('/edit-profile', validator.body(editProfileSchema), editProfile);

export default router;
