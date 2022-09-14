import { Router } from 'express';

import {
  editProfile,
  changePassword,
  getUserStatistics,
  getSpecificUserStatistics,
} from '../../controllers';
import {
  constants,
  validator,
  changePasswordSchema,
  editProfileSchema,
  idSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.userRoles;

router.use(checkUserRole([COMEDIAN, ADMIN, MASTER_ADMIN]));

router.get('/statistics', getUserStatistics);
router.get('/statistics/:userId', validator.params(idSchema), getSpecificUserStatistics);

router.patch('/change-password', validator.body(changePasswordSchema), changePassword);
router.patch('/edit-profile', validator.body(editProfileSchema), editProfile);

export default router;
