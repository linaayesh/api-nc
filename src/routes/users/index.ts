import { Router } from 'express';

import {
  pendingUsers,
  approveUser,
  approvedUser,
  rejectUser,
  rejectedUsers,
  createUser,
  blockUser,
  getPaginatedContents,
  matchUserContent,
  changePassword,
  getUserStatistics,
  editDashboardSettings,
  getDashboardSettings,
  editProfile,
} from '../../controllers';
import {
  constants,
  validator,
  idSchema,
  getPaginatedDataSchema,
  createUserSchema,
  matchUserContentSchema,
  changePasswordSchema,
  editSystemSettingsSchema,
  editProfileSchema,
} from '../../helpers';
import { checkUserRole } from '../../middleware';

const router = Router();

const { ADMIN, MASTER_ADMIN, COMEDIAN } = constants.USER_ROLES;

router.use(checkUserRole([COMEDIAN, ADMIN, MASTER_ADMIN]));
router.patch('/change-password', validator.body(changePasswordSchema), changePassword);
router.patch('/edit-profile', validator.body(editProfileSchema), editProfile);

router.use(checkUserRole([ADMIN, MASTER_ADMIN]));

router.get('/approved-list', validator.query(getPaginatedDataSchema), approvedUser);
router.get('/rejected-list', validator.query(getPaginatedDataSchema), rejectedUsers);
router.get('/waiting-list', validator.query(getPaginatedDataSchema), pendingUsers);
router.get('/contents', validator.query(getPaginatedDataSchema), getPaginatedContents);
router.get('/statistics/:userId', validator.params(idSchema), getUserStatistics);
router.post('/add-user', validator.body(createUserSchema), createUser);

router.patch('/reject/:userId', validator.params(idSchema), rejectUser);
router.patch('/approve/:userId', validator.params(idSchema), approveUser);
router.patch('/match-user-content', validator.body(matchUserContentSchema), matchUserContent);
router.patch('/edit-user-profile', validator.body(editProfileSchema), editProfile);

router.use(checkUserRole([MASTER_ADMIN]));
router.get('/dashboard-settings', getDashboardSettings);
router.patch('/edit-dashboard-settings', validator.body(editSystemSettingsSchema), editDashboardSettings);
router.patch('/block-user/:userId', validator.params(idSchema), blockUser);

export default router;
