import { Router } from 'express';

import {
  editProfile,
  changePassword,
  getUserStatistics,
  getUserDataByID,
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
router.get('/statistics', getUserStatistics);

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.patch('/edit-user-profile', validator.body(editProfileSchema), editProfile);

router.use(checkUserRole([MASTER_ADMIN]));

router.get('/user-data/:userId', validator.params(idSchema), getUserDataByID);

export default router;
